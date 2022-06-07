import { useSelector } from "react-redux";

import classes from "./LevelStats.module.css";

export default function GameLevelStats(props) {
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
          className={classes.icon}
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
        className={classes.icon}
        viewBox="0 0 512 512"
      >
        <path
          d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
          fill="yellow"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </svg>
    );
  });

  const levelsDoneAndLeftToDo = levelsDone.concat(levelsLeftToDo);

  const { className } = props;
  return (
    <div className={`${classes.container} ${className}`}>
      {levelsDoneAndLeftToDo}
    </div>
  );
}
