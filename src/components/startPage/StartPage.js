import { CSSTransition } from "react-transition-group";

import styles from "./StartPage.module.css";
import StartButton from "./StartButton";
import { START_PAGE_TITLE, START_PAGE_P } from "../../UI/UITextConstants";
import flagImg from "./flags.webp";

export default function StartPage({ show, onExited, timeout }) {
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
      <div className={styles.startpage}>
        <h2>{START_PAGE_TITLE}</h2>
        <div>
          <img className={styles.img} src={flagImg} alt="two flags" />
        </div>
        <p>{START_PAGE_P}</p>
        <StartButton />
      </div>
    </CSSTransition>
  );
}
