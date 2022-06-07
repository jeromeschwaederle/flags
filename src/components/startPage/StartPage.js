import classes from "./StartPage.module.css";

import StartEndButton from "./StartEndButton";
import { START_PAGE_TITLE, START_PAGE_P } from "../../UI/UITextConstants";

export default function StartPage() {
  return (
    <div className={classes.startpage}>
      <h2>{START_PAGE_TITLE}</h2>
      <p>{START_PAGE_P}</p>
      <StartEndButton />
    </div>
  );
}
