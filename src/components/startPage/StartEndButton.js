import { useDispatch, useSelector } from "react-redux";

import classes from "./StartEndButton.module.css";
import { BUTTON_END_GAME, BUTTON_START_GAME } from "../../UI/UITextConstants";
import { START, END } from "../../store/ActionNames";
import { gameActions } from "../../store/gameSlice";

export default function StartEndButton({ className }) {
  const dispatch = useDispatch();
  const hasStarted = useSelector(state => state.game.hasStarted);

  const appliedClasses = hasStarted
    ? `${classes.btn} ${classes.endGame} ${className}`
    : `${classes.btn}`;
  const innerText = hasStarted ? BUTTON_END_GAME : BUTTON_START_GAME;

  const clickHandler = () => {
    console.log("click");
    if (!hasStarted) dispatch(gameActions.startOrEndGame(START));
    if (hasStarted) dispatch(gameActions.startOrEndGame(END));
  };

  console.log(hasStarted);

  return (
    <button onClick={clickHandler} className={appliedClasses}>
      <span>{innerText}</span>
    </button>
  );
}
