import { useDispatch } from "react-redux";
import { gameActions } from "../../store/gameSlice";

import classes from "./DeadPage.module.css";

export default function DeadPage() {
  const dispatch = useDispatch();
  const clickHandler = () => dispatch(gameActions.reborn());
  return (
    <div className={classes.message}>
      <p>YOU ARE DEAD</p>
      <button onClick={clickHandler}>Try Again</button>
    </div>
  );
}
