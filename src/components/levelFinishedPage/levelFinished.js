import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import {
  FINISHED_CONGRATS,
  FINISHED_LEVEL_INFO,
  FINISHED_BTN,
  FINISHED_GAME,
  FINISHED_GAME_BTN,
} from "../../UI/UITextConstants";
import LevelStats from "../game/LevelStats";
import styles from "./levelFinished.module.css";
import { gameActions } from "../../store/gameSlice";
import Button from "../../UI/Button";

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
        <p classNames={styles.congratulations}>{FINISHED_CONGRATS}</p>
        <p>
          {currentLevel <= numberOfLevels
            ? `${FINISHED_LEVEL_INFO} ${currentLevel - 1}`
            : `${FINISHED_GAME}`}
        </p>
        <LevelStats />
        <Button
          onClick={clickHandler}
          className={styles.btn}
          text={
            currentLevel <= numberOfLevels
              ? `${FINISHED_BTN} ${currentLevel}`
              : `${FINISHED_GAME_BTN}`
          }
        />
      </div>
    </CSSTransition>
  );
}
