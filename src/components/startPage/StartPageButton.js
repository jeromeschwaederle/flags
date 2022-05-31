import { useDispatch, useSelector } from "react-redux";

import classes from "./StartPageButton.module.css";
import { BUTTON_START_GAME } from "../../UI/UITextConstants";
import { gameActions } from "../../store/gameSlice";

export default function StartPageButton() {
  const dispatch = useDispatch();
  const hasStarted = useSelector(state => state.game.hasStarted);

  const clickHandler = () => dispatch(gameActions.startOrEndGame("START"));

  console.log(hasStarted);

  return (
    <button onClick={clickHandler} className={classes.button}>
      <span>{BUTTON_START_GAME}</span>
    </button>
  );
}
