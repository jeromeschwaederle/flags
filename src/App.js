import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import classes from "./App.module.css";
import StartPage from "./components/startPage/StartPage";
import Game from "./components/game/Game";
import { fetchInitialData } from "./store/gameActions";

const App = () => {
  const dispatch = useDispatch();
  const hasStarted = useSelector(state => state.gameplay.game.hasStarted);
  const containerClass = hasStarted ? "" : `${classes.containerStart}`;

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

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
