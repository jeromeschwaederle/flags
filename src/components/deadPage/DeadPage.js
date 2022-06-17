import { useDispatch } from "react-redux";
import { gameActions } from "../../store/gameSlice";
import { CSSTransition } from "react-transition-group";

import styles from "./DeadPage.module.css";
import { DEAD_MESSAGE, DEAD_BTN_TEXT } from "../../UI/UITextConstants";
import Button from "../../UI/Button";
import SkullSvg from "../../UI/skullSvg";

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
        <SkullSvg />
        <p className={styles.message}>{DEAD_MESSAGE}</p>
        <Button onClick={clickHandler} text={DEAD_BTN_TEXT} />
      </div>
    </CSSTransition>
  );
}
