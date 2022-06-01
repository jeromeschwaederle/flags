import { useDispatch, useSelector } from "react-redux";

import classes from "./StartEndButton.module.css";
import {
  BUTTON_END_GAME,
  BUTTON_START_GAME,
  BUTTON_GAME_LOADING,
} from "../../UI/UITextConstants";
import { START, END } from "../../store/ActionNames";
import { gameActions } from "../../store/gameSlice";

export default function StartEndButton({ className }) {
  const dispatch = useDispatch();
  const hasStarted = useSelector(state => state.game.hasStarted);
  const isLoading = useSelector(state => state.game.isLoading);

  let appliedClasses = `${classes.btn}`;
  let innerText = "";
  if (!hasStarted && isLoading) {
    innerText = BUTTON_GAME_LOADING;
    appliedClasses = `${classes.btn} ${classes.loading}`;
  }

  if (!hasStarted && !isLoading) innerText = BUTTON_START_GAME;

  if (hasStarted && !isLoading) {
    appliedClasses = `${classes.btn} ${classes.endGame} ${className}`;
    innerText = BUTTON_END_GAME;
  }

  const clickHandler = () => {
    if (!hasStarted) dispatch(gameActions.startOrEndGame(START));
    if (hasStarted) dispatch(gameActions.startOrEndGame(END));
  };

  return (
    <button
      onClick={clickHandler}
      className={appliedClasses}
      disabled={isLoading}
    >
      <span>{innerText}</span>
    </button>
  );
}
