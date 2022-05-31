import classes from "./StartPage.module.css";

import StartEndButton from "./StartEndButton";

export default function StartPage() {
  return (
    <div className={classes.startpage}>
      <StartEndButton />
    </div>
  );
}
