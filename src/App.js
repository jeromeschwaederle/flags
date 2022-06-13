import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import classes from "./App.module.css";
import StartPage from "./components/startPage/StartPage";
import Game from "./components/game/Game";
import { fetchInitialData } from "./store/gameFetchData";
import DeadPage from "./components/deadPage/DeadPage";
import LevelFinished from "./components/levelFinishedPage/levelFinished";

const App = () => {
  const dispatch = useDispatch();
  const hasStarted = useSelector(state => state.game.gameplay.game.hasStarted);
  const isDead = useSelector(state => state.game.gameplay.lives.isDead);
  const levelFinished = useSelector(
    state => state.game.gameplay.level.isFinished
  );

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  // Transitions logic
  const [showGame, setShowGame] = useState(null);
  const [showDeadPage, setShowDeadPage] = useState(null);
  const [showLevelFinished, setShowLevelFinished] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

  const deadPageExitedHandler = () => setShowGame(true);
  const gameExitedHanler = () => {
    if (isDead) setShowDeadPage(true);
    if (levelFinished) setShowLevelFinished(true);
  };
  const levelFinishedExitedHandler = () => setShowGame(true);

  useEffect(() => {
    // FIRST LOAD
    if (firstLoad && hasStarted && !isDead && !levelFinished) {
      setShowGame(true);
      setFirstLoad(false);
    }
    // IF I DIED
    if (isDead) {
      setShowGame(false);
    }
    // IF I "TRY AGAIN" OR GO TO NEXT LEVEL
    if (hasStarted && !isDead && !levelFinished) {
      setShowDeadPage(false);
      setShowLevelFinished(false);
    }
    // IF I FINISH THE LEVEL
    if (hasStarted && !isDead && levelFinished) {
      setShowGame(false);
    }
  }, [isDead, hasStarted, levelFinished, firstLoad]);

  const containerClass = hasStarted ? "" : `${classes.containerStart}`;
  return (
    <div className={classes.app}>
      <div className={`${classes.container} ${containerClass}`}>
        {!hasStarted && !isDead && <StartPage />}
        <LevelFinished
          show={showLevelFinished}
          onExited={levelFinishedExitedHandler}
          timeout={1}
        />
        <Game show={showGame} onExited={gameExitedHanler} timeout={1} />
        <DeadPage
          show={showDeadPage}
          onExited={deadPageExitedHandler}
          timeout={1}
        />
      </div>
    </div>
  );
};

export default App;
