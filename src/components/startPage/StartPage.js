import { CSSTransition } from "react-transition-group";

import styles from "./StartPage.module.css";
import StartEndButton from "./StartEndButton";
import { START_PAGE_TITLE, START_PAGE_P } from "../../UI/UITextConstants";

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
        <p>{START_PAGE_P}</p>
        <StartEndButton />
      </div>
    </CSSTransition>
  );
}
