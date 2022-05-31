import classes from "./Game.module.css";
import Lives from "./Lives";

export default function Game() {
  return (
    <div className={classes.game}>
      <Lives className={classes.icons} />
      <p className={classes.para}>GAME HAS STARTED !!!!</p>
    </div>
  );
}
