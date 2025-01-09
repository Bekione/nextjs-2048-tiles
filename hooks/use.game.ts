"use client";

import { useCallback, useState } from "react";
import {
  type Cell,
  type Grid,
  type Direction,
  type GameState,
} from "../types/game";

const GRID_SIZE = 4;
const WINNING_VALUE = 2048;

//This function creates an array with 4 rows, each filled with an array of 4 null's
function createEmptyGrid(): Grid {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
}

function generateRandomCell(grid: Grid): Cell | null {
  const emptyCells: [number, number][] = [];
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (!cell) emptyCells.push([i, j]);
    });
  });

  if (emptyCells.length === 0) return null;
  const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return {
    id: `${x}-${y}-${Date.now()}`,
    value: Math.random() < 0.9 ? 2 : 4,
    x,
    y,
    isNew: true,
  };
}

function transpose(grid: Grid): Grid {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
}

function reverse(grid: Grid): Grid {
  return grid.map((row) => [...row].reverse());
}

function compress(grid: Grid): Grid {
  const newGrid = createEmptyGrid();

  for (let i = 0; i < GRID_SIZE; i++) {
    let colIndex = 0;
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j]) {
        newGrid[i][colIndex] = grid[i][j];
        colIndex++;
      }
    }
  }

  return newGrid;
}

function merge(grid: Grid): { newGrid: Grid; score: number; merged: boolean } {
  const newGrid = createEmptyGrid();
  let score = 0;
  let merged = false;

  for (let i = 0; i < GRID_SIZE; i++) {
    let colIndex = 0;
    for (let j = 0; j < GRID_SIZE - 1; j++) {
      if (!grid[i][j]) continue;

      if (grid[i][j]?.value === grid[i][j + 1]?.value) {
        const mergedValue = grid[i][j]!.value * 2;
        newGrid[i][colIndex] = {
          id: `${i}-${colIndex}-${Date.now()}`,
          value: mergedValue,
          x: i,
          y: colIndex,
          isMerged: true,
        };
        score += mergedValue;
        merged = true;
        j++; // Skip next cell as it's been merged
      } else {
        newGrid[i][colIndex] = {
          ...grid[i][j]!,
          id: `${i}-${colIndex}-${Date.now()}`,
          x: i,
          y: colIndex,
          isMerged: false,
        };
      }
      colIndex++;
    }
    // Handle the last cell if it wasn't merged
    if (
      grid[i][GRID_SIZE - 1] &&
      colIndex < GRID_SIZE &&
      !grid[i][GRID_SIZE - 1]?.isMerged
    ) {
      newGrid[i][colIndex] = {
        ...grid[i][GRID_SIZE - 1]!,
        id: `${i}-${colIndex}-${Date.now()}`,
        x: i,
        y: colIndex,
        isMerged: false,
      };
    }
  }

  return { newGrid, score, merged };
}

function moveGrid(
  grid: Grid,
  direction: Direction
): { newGrid: Grid; score: number; moved: boolean } {
  let workingGrid = [...grid.map((row) => [...row])];
  let score = 0;
  let moved = false;

  // First, handle rotations based on direction
  switch (direction) {
    case "up":
      workingGrid = transpose(workingGrid);
      break;
    case "down":
      workingGrid = reverse(transpose(workingGrid));
      break;
    case "right":
      workingGrid = reverse(workingGrid);
      break;
    // 'left' needs no rotation
  }

  // Compress (move all tiles to the left)
  const compressedGrid = compress(workingGrid);
  moved = JSON.stringify(compressedGrid) !== JSON.stringify(workingGrid);

  // Merge
  const {
    newGrid: mergedGrid,
    score: mergeScore,
    merged,
  } = merge(compressedGrid);
  moved = moved || merged;
  score += mergeScore;

  // Compress again after merging
  workingGrid = compress(mergedGrid);

  // Rotate back
  switch (direction) {
    case "up":
      workingGrid = transpose(workingGrid);
      break;
    case "down":
      workingGrid = transpose(reverse(workingGrid));
      break;
    case "right":
      workingGrid = reverse(workingGrid);
      break;
    // 'left' needs no rotation
  }

  return { newGrid: workingGrid, score, moved };
}

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const initialGrid = createEmptyGrid();
    const cell1 = generateRandomCell(initialGrid);
    if (cell1) initialGrid[cell1.x][cell1.y] = cell1;
    const cell2 = generateRandomCell(initialGrid);
    if (cell2) initialGrid[cell2.x][cell2.y] = cell2;

    return {
      grid: initialGrid,
      score: 0,
      bestScore: parseInt(localStorage.getItem("bestScore") || "0"),
      isGameOver: false,
      hasWon: false,
    };
  });

  const move = useCallback(
    (direction: Direction) => {
      if (gameState.isGameOver) return;

      const { newGrid, score, moved } = moveGrid(gameState.grid, direction);

      if (!moved) return;

      const newCell = generateRandomCell(newGrid);
      if (newCell) {
        newGrid[newCell.x][newCell.y] = newCell;
      }

      const newScore = gameState.score + score;
      const newBestScore = Math.max(newScore, gameState.bestScore);
      if (newBestScore > gameState.bestScore) {
        localStorage.setItem("bestScore", newBestScore.toString());
      }

      const hasWon = newGrid.some((row) =>
        row.some((cell) => cell?.value === WINNING_VALUE)
      );

      setGameState({
        grid: newGrid,
        score: newScore,
        bestScore: newBestScore,
        isGameOver: false,
        hasWon,
      });
    },
    [gameState]
  );

  return {
    gameState,
    move,
  };
}
