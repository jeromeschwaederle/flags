import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import {
  FINISHED_CONGRATS,
  FINISHED_LEVEL_INFO,
  FINISHED_BTN,
} from "../../UI/UITextConstants";
import GameLevelStats from "../game/LevelStats";
import styles from "./levelFinished.module.css";
import { gameActions } from "../../store/gameSlice";

export default function LevelFinished({ show, onExited, timeout }) {
  const dispatch = useDispatch();
  const levelNumber = useSelector(
    state => state.game.gameplay.level.currentLevel
  );

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
      <div className={styles.container}>
        <p>{FINISHED_CONGRATS}</p>
        <p>
          {FINISHED_LEVEL_INFO}
          {levelNumber - 1}
        </p>
        <GameLevelStats />
        <button onClick={clickHandler} className={styles.btn}>
          <span>
            {FINISHED_BTN}
            {levelNumber}
          </span>
        </button>
      </div>
    </CSSTransition>
  );
}
