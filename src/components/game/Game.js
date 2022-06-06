import classes from "./Game.module.css";

import Lives from "./GameLives";
import Level from "./GameLevel";
import StartEndButton from "../startPage/StartEndButton";
import GameFlags from "./GameFlags";
import LevelStats from "./LevelStats";
import GuessCheck from "./GameGuessCheck";

export default function Game() {
  return (
    <div className={classes.game}>
      <Lives className={classes.icons} />
      <Level className={classes.level} />
      <StartEndButton className={classes.endBtn} />
      <GuessCheck className={classes.guessCheck} />
      <LevelStats className={classes.levelStats} />
      <GameFlags className={classes.gameFlags} />
    </div>
  );
}
