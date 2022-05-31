import classes from "./StartPage.module.css";

import StartPageButton from "./StartPageButton";

export default function StartPage() {
  return (
    <div className={classes.startpage}>
      <StartPageButton />
    </div>
  );
}
