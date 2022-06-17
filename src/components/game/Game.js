import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";

import { gameActions } from "../../store/gameSlice";
import Lives from "./GameLives";
import Level from "./GameLevel";
import Button from "../../UI/Button";
import GameFlags from "./GameFlags";
import GameStats from "./GameStats";
import styles from "./Game.module.css";
import { BUTTON_END_GAME } from "../../UI/UITextConstants";
import { END } from "../../store/action-name-constants";

export default function Game({ show, onExited, timeout }) {
  const dispatch = useDispatch();
  const clickHandler = () => dispatch(gameActions.startOrEndGame(END));

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
      <div className={styles.game}>
        <Lives className={styles.hearts} />
        <Level className={styles.level} />
        <Button
          className={styles.endBtn}
          onClick={clickHandler}
          text={BUTTON_END_GAME}
        />
        <GameStats className={styles.gameStats} />
        <GameFlags className={styles.gameFlags} />
      </div>
    </CSSTransition>
  );
}
