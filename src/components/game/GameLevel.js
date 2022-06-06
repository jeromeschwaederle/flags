import { useSelector } from "react-redux";

import classes from "./GameLevel.module.css";
import { LEVEL_DISPLAYER } from "../../UI/UITextConstants";

export default function Level({ className }) {
  const level = useSelector(state => state.game.gameplay.level.currentLevel);

  const appliedClasses = `${className} ${classes.level}`;

  return (
    <h2 className={appliedClasses}>
      {LEVEL_DISPLAYER}
      {level}
    </h2>
  );
}
