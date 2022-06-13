import { useDispatch } from "react-redux";
import { gameActions } from "../../store/gameSlice";
import { CSSTransition } from "react-transition-group";

import styles from "./DeadPage.module.css";
import { DEAD_MESSAGE, DEAD_BTN_TEXT } from "../../UI/UITextConstants";

export default function DeadPage({ show, onExited, timeout }) {
  const dispatch = useDispatch();
  const clickHandler = () => dispatch(gameActions.reborn());

  return (
    <CSSTransition
      in={show}
      timeout={timeout * 1000}
      classNames={{ ...styles }}
      appear
      mountOnEnter
      unmountOnExit
      onExited={onExited}
    >
      <div>
        <p>{DEAD_MESSAGE}</p>
        <button className={styles.btn} onClick={clickHandler}>
          <span>{DEAD_BTN_TEXT}</span>
        </button>
      </div>
    </CSSTransition>
  );
}
