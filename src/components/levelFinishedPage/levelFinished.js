import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import {
  FINISHED_CONGRATS,
  FINISHED_LEVEL_INFO,
  FINISHED_BTN,
  FINISHED_GAME,
  FINISHED_GAME_BTN,
} from "../../UI/UITextConstants";
import GameLevelStats from "../game/LevelStats";
import styles from "./levelFinished.module.css";
import { gameActions } from "../../store/gameSlice";

export default function LevelFinished({ show, onExited, timeout }) {
  const dispatch = useDispatch();
  const currentLevel = useSelector(
    state => state.game.gameplay.level.currentLevel
  );
  const numberOfLevels = useSelector(
    state => state.game.gameplay.level.levelNumber
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
          {currentLevel <= numberOfLevels
            ? `${FINISHED_LEVEL_INFO} ${currentLevel - 1}`
            : `${FINISHED_GAME}`}
        </p>
        <GameLevelStats />
        {/* {currentLevel <= numberOfLevels && ( */}
        <button onClick={clickHandler} className={styles.btn}>
          <span>
            {currentLevel <= numberOfLevels
              ? `${FINISHED_BTN} ${currentLevel}`
              : `${FINISHED_GAME_BTN}`}
          </span>
        </button>
        {/* )} */}
      </div>
    </CSSTransition>
  );
}
