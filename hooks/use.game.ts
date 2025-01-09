'use client'

import { useState } from 'react'
import { type Cell, type Grid, type GameState } from '../types/game'

const GRID_SIZE = 4
const WINNING_VALUE = 2048

//This function creates an array with 4 rows, each filled with an array of 4 null's
function createEmptyGrid(): Grid {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
}

function generateRandomCell(grid: Grid): Cell | null {
  const emptyCells: [number, number][] = []
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (!cell) emptyCells.push([i, j])
    })
  })

  if (emptyCells.length === 0) return null
  const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  return {
    id: `${x}-${y}-${Date.now()}`,
    value: Math.random() < 0.9 ? 2 : 4,
    x,
    y,
    isNew: true,
  }
}

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const initialGrid = createEmptyGrid()
    const cell1 = generateRandomCell(initialGrid)
    if (cell1) initialGrid[cell1.x][cell1.y] = cell1
    const cell2 = generateRandomCell(initialGrid)
    if (cell2) initialGrid[cell2.x][cell2.y] = cell2
    
    return {
      grid: initialGrid,
      score: 0,
      bestScore: parseInt(localStorage.getItem('bestScore') || '0'),
      isGameOver: false,
      hasWon: false,
    }
  })

  return {
    gameState,
  }
}

