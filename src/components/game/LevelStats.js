import { useSelector } from "react-redux";

import classes from "./LevelStats.module.css";

export default function LevelStats(props) {
  const currentLevel = useSelector(
    state => state.game.gameplay.level.currentLevel
  );
  const numberOfLevels = useSelector(
    state => state.game.gameplay.level.levelNumber
  );
  const numberOfLevelsLeftToDo = numberOfLevels - currentLevel;

  const levelsLeftToDo = new Array(numberOfLevelsLeftToDo + 1)
    .fill(undefined)
    .map((_, i) => {
      return (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`${classes.icon} ${classes.iconToGuess}`}
          viewBox="0 0 512 512"
        >
          <path
            d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
      );
    });

  const levelsDone = new Array(currentLevel - 1).fill(undefined).map((_, i) => {
    return (
      <svg
        key={i + 100}
        xmlns="http://www.w3.org/2000/svg"
        className={`${classes.icon} ${classes.iconToGuess}`}
        viewBox="0 0 512 512"
      >
        <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z" />
      </svg>
    );
  });

  // const currentStar = (
  //   <svg
  //     key={1000}
  //     xmlns="http://www.w3.org/2000/svg"
  //     className={`${classes.icon} ${classes.iconToGuess}`}
  //     viewBox="0 0 512 512"
  //   >
  //     <path
  //       d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeLinejoin="round"
  //       strokeWidth="32"
  //     />
  //     <path d="M256 48v316L118 464l54-160-140-96h172l52-160z" />
  //   </svg>
  // );

  const levelsDoneAndLeftToDo = levelsDone.concat(levelsLeftToDo);
  // levelDoneAndLeftToDo.unshift(currentStar);

  const { className } = props;
  return (
    <div className={`${classes.starsContainer} ${className}`}>
      {levelsDoneAndLeftToDo}
    </div>
  );
}
