import classes from "./Game.module.css";

import Lives from "./GameLives";
import Level from "./GameLevel";
import StartEndButton from "../startPage/StartEndButton";
import GameFlags from "./GameFlags";

import GameStats from "./GameStats";

export default function Game() {
  return (
    <div className={classes.game}>
      <Lives className={classes.hearts} />
      <Level className={classes.level} />
      <StartEndButton className={classes.endBtn} />
      <GameStats className={classes.gameStats} />
      <GameFlags className={classes.gameFlags} />
    </div>
  );
}
