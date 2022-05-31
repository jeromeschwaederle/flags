import classes from "./Game.module.css";
import Lives from "./Lives";
import Level from "./Level";
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
