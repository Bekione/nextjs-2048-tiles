import Header from "@/components/header";
import GameBoard from "@/components/game-board";
import InstractionCard from "@/components/instraction-card";

export default function Home() {
  return (
    <div className="h-screen relative flex flex-col items-center">
      <Header />
      <GameBoard />
      <InstractionCard />
    </div>
  );
}
