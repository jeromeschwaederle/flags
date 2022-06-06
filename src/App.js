import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import classes from "./App.module.css";
import StartPage from "./components/startPage/StartPage";
import Game from "./components/game/Game";
import { fetchInitialData } from "./store/gameFetchData";
import DeadPage from "./components/deadPage/DeadPage";

const App = () => {
  const hasStarted = useSelector(state => state.game.gameplay.game.hasStarted);
  const isDead = useSelector(state => state.game.gameplay.lives.isDead);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  const containerClass = hasStarted ? "" : `${classes.containerStart}`;
  return (
    <div className={classes.app}>
      <div className={`${classes.container} ${containerClass}`}>
        {!hasStarted && !isDead && <StartPage />}
        {hasStarted && !isDead && <Game />}
        {isDead && <DeadPage />}
      </div>
    </div>
  );
};

export default App;
