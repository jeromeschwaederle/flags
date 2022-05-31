import { useSelector } from "react-redux";

import classes from "./App.module.css";
import StartPage from "./components/startPage/StartPage";
import Game from "./components/game/Game";

const App = () => {
  const hasStarted = useSelector(state => state.game.hasStarted);
  const containerClass = hasStarted ? "" : `${classes.containerStart}`;

  return (
    <div className={classes.app}>
      <div className={`${classes.container} ${containerClass}`}>
        {!hasStarted && <StartPage />}
        {hasStarted && <Game />}
      </div>
    </div>
  );
};

export default App;
