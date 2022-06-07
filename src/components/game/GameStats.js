import GameLevelStats from "./LevelStats";
import GameGuessStats from "./GameGuessStats";
import classes from "./GameStats.module.css";

export default function GameStats(props) {
  const { className } = props;
  return (
    <div className={`${classes.gameStats} ${className}`}>
      <GameGuessStats />
      <GameLevelStats />
    </div>
  );
}
