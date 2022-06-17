import { useSelector } from "react-redux";

import classes from "./GameGuessStats.module.css";

export default function GameGuessStats() {
  const guessedNumber = useSelector(state => state.game.countries.found.length);
  const gessed = new Array(guessedNumber).fill(undefined).map((_, i) => {
    return (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`${classes.icon} ${classes.iconGuessed}`}
        viewBox="0 0 512 512"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="50"
          d="M352 176L217.6 336 160 272"
        />
        <rect
          x="64"
          y="64"
          width="384"
          height="384"
          rx="48"
          ry="48"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="50"
        />
      </svg>
    );
  });

  const leftToGuessNumber = useSelector(
    state => state.game.countries.toFind.length
  );
  const leftToGuess = new Array(leftToGuessNumber)
    .fill(undefined)
    .map((_, i) => {
      return (
        <svg
          key={i + 100}
          xmlns="http://www.w3.org/2000/svg"
          className={`${classes.icon} ${classes.iconToGuess}`}
          viewBox="0 0 512 512"
        >
          <title>Help Circle</title>
          <path
            d="M256 80a176 176 0 10176 176A176 176 0 00256 80z"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="32"
          />
          <path
            d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="28"
          />
          <circle cx="250" cy="348" r="20" />
        </svg>
      );
    });

  return (
    <div className={classes.container}>
      <div className={classes.gessed}>{gessed}</div>
      <div className={classes.leftToGuess}>{leftToGuess}</div>
    </div>
  );
}
