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

  const levelsLeftToDo = new Array(numberOfLevelsLeftToDo)
    .fill(undefined)
    .map((_, i) => {
      return (
        <svg
          key={i + 100}
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

  const levelDoneAndLeftToDo = levelsDone.concat(levelsLeftToDo);
  // levelDoneAndLeftToDo.unshift(currentStar);

  const { className } = props;
  const appliedClasses = `${classes.starsContainer} ${className}`;

  return <div className={appliedClasses}>{levelDoneAndLeftToDo}</div>;
}
