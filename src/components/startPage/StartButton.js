import { useDispatch, useSelector } from "react-redux";

import classes from "./StartButton.module.css";
import {
  BUTTON_START_GAME,
  BUTTON_GAME_LOADING,
} from "../../UI/UITextConstants";
import { START } from "../../store/action-name-constants";
import { gameActions } from "../../store/gameSlice";

export default function StartEndButton({ className }) {
  const dispatch = useDispatch();
  const hasStarted = useSelector(state => state.game.gameplay.game.hasStarted);
  const isLoading = useSelector(state => state.ui.isLoading);

  let appliedClasses = `${classes.btn}`;
  let innerText = "";
  if (!hasStarted && isLoading) {
    innerText = BUTTON_GAME_LOADING;
    appliedClasses = `${classes.btn} ${classes.loading}`;
  }

  if ((!hasStarted && !isLoading) || (hasStarted && !isLoading))
    innerText = BUTTON_START_GAME;

  const clickHandler = () => dispatch(gameActions.startOrEndGame(START));

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
