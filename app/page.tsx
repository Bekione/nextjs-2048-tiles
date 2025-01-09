import Header from "@/components/header";
import GameBoard from "@/components/game-board";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="h-screen relative flex flex-col items-center">
      <Header />
      <GameBoard />
      <Card className="absolute bottom-2 right-2"> 
        <CardContent className="p-4 text-center text-muted-foreground">
          <p>Use arrow keys or WASD to move tiles</p>
          <p>Add the same numbers to reach 2048!</p>
        </CardContent>
      </Card>
    </div>
  );
}
