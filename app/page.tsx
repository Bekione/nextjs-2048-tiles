import Header from "@/components/header";
import GameBoard from "@/components/game-board";
import InstractionCard from "@/components/instraction-card";
import { GitHubLink } from "@/components/github-link";
export default function Home() {
  return (
    <div className="h-screen relative flex flex-col items-center bg-muted">
      <Header />
      <GameBoard />
      <InstractionCard />
      <GitHubLink />
    </div>
  );
}
