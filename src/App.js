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
  const [firstLoad, setFirstLoad] = useState(true);
  const [showStartPage, setShowStartPage] = useState(true);
  const [showGame, setShowGame] = useState(null);
  const [showDeadPage, setShowDeadPage] = useState(null);
  const [showLevelFinished, setShowLevelFinished] = useState(null);

  console.log("firstLoad", firstLoad);
  console.log("showStartPage", showStartPage);
  console.log("showGame", showGame);
  console.log("showDeadPage", showDeadPage);
  console.log("showLevelFinished", showLevelFinished);
  console.log("####################################");

  const startPageExitedHandler = () => setShowGame(true);
  const deadPageExitedHandler = () => setShowGame(true);
  const gameExitedHanler = () => {
    if (isDead) setShowDeadPage(true);
    if (levelFinished) setShowLevelFinished(true);
    if (!hasStarted) setShowStartPage(true);
  };
  const levelFinishedExitedHandler = () => setShowGame(true);

  useEffect(() => {
    // IF I START OR RESTART THE GAME
    if (firstLoad && !hasStarted && !isDead && !levelFinished) {
      setShowStartPage(true);
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
      setShowStartPage(false);
    }
    // IF I FINISH THE LEVEL
    if (hasStarted && !isDead && levelFinished) {
      setShowGame(false);
    }
    // IF I RESTART THE GAME
    if (!hasStarted && !isDead && !levelFinished) {
      setShowGame(false);
    }
  }, [isDead, hasStarted, levelFinished, firstLoad]);

  const containerClass = hasStarted ? "" : `${classes.containerStart}`;
  return (
    <div className={classes.app}>
      <div className={`${classes.container} ${containerClass}`}>
        <StartPage
          show={showStartPage}
          onExited={startPageExitedHandler}
          timeout={1}
        />
        <LevelFinished
          show={showLevelFinished}
          onExited={levelFinishedExitedHandler}
          timeout={0.7}
        />
        <Game show={showGame} onExited={gameExitedHanler} timeout={0.7} />
        <DeadPage
          show={showDeadPage}
          onExited={deadPageExitedHandler}
          timeout={0.7}
        />
      </div>
    </div>
  );
};

export default App;
