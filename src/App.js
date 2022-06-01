import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import classes from "./App.module.css";
import StartPage from "./components/startPage/StartPage";
import Game from "./components/game/Game";
import { fetchInitialData } from "./store/gameActions";

const App = () => {
  const dispatch = useDispatch();
  const hasStarted = useSelector(state => state.game.hasStarted);
  const containerClass = hasStarted ? "" : `${classes.containerStart}`;

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  const data = useSelector(state => state.game.data);
  console.log(data);

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
