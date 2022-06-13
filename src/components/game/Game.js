import { CSSTransition } from "react-transition-group";

import Lives from "./GameLives";
import Level from "./GameLevel";
import StartEndButton from "../startPage/StartEndButton";
import GameFlags from "./GameFlags";
import GameStats from "./GameStats";
import styles from "./Game.module.css";

export default function Game({ show, onExited, timeout }) {
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
        <StartEndButton className={styles.endBtn} />
        <GameStats className={styles.gameStats} />
        <GameFlags className={styles.gameFlags} />
      </div>
    </CSSTransition>
  );
}
