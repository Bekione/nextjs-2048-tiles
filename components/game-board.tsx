"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tile } from "./tile";
import { useGame } from "@/hooks/use.game";
import { type Direction } from "../types/game";

const GameBoard = () => {
  const { gameState, move } = useGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyToDirection: { [key: string]: Direction } = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        KeyW: "up",
        KeyS: "down",
        KeyA: "left",
        KeyD: "right",
      };

      const direction = keyToDirection[e.code];
      if (direction) {
        e.preventDefault();
        move(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background transition-colors duration-300 z-50">
      <div className="w-[432px] flex justify-between mb-2">
        <Button variant="outline" className="h-14" onClick={() => {}}>
          New Game
        </Button>
        <Card className="h-14">
          <CardContent className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="text-muted-foreground text-sm">SCORE</div>
              <div className="text-foreground text-xl font-bold">
                {gameState.score}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="text-muted-foreground text-sm">BEST</div>
              <div className="text-foreground text-xl font-bold">
                {gameState.bestScore}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-2 mb-2">
        <CardContent className="p-2 bg-muted rounded-lg">
          <div
            className="grid grid-cols-4 gap-2"
            style={{ width: "400px", height: "400px" }}
          >
            {gameState.grid.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className="bg-muted-foreground/20 rounded-lg relative"
                  style={{ width: "85px", height: "85px" }}
                >
                  {cell && (
                    <Tile
                      value={cell.value}
                      isNew={cell.isNew}
                      isMerged={cell.isMerged}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameBoard;
