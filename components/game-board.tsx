"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tile } from "./tile";

const GameBoard = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background transition-colors duration-300">
      
      <div className="w-[432px] flex justify-between mb-2">
        <Button variant="outline" className="h-14" onClick={() => {}}>
          New Game
        </Button>
        <Card className="h-14">
          <CardContent className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="text-muted-foreground text-sm">SCORE</div>
              <div className="text-foreground text-xl font-bold">123640</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="text-muted-foreground text-sm">BEST</div>
              <div className="text-foreground text-xl font-bold">18000</div>
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
              (row, i) => {
                return <Tile key={i} value={row} />;
              }
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameBoard;
