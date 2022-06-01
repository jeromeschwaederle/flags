import classes from "./Game.module.css";
import Lives from "./GameLives";
import Level from "./GameLevel";
import StartEndButton from "../startPage/StartEndButton";

export default function Game() {
  return (
    <div className={classes.game}>
      <Lives className={classes.icons} />
      <Level className={classes.level} />
      <StartEndButton className={classes.endBtn} />
    </div>
  );
}
