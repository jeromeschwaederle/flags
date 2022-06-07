import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import classes from "./GameLives.module.css";

export default function Lifes({ className }) {
  const currentNumberOfLives = useSelector(
    state => state.game.gameplay.lives.currentLiveNumber
  );
  const maxLives = useSelector(state => state.game.gameplay.lives.maxLives);
  const numberEmptyHearts = maxLives - currentNumberOfLives;

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (numberEmptyHearts === 0) return;

    setAnimate(true);

    const timer = setTimeout(() => {
      setAnimate(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [numberEmptyHearts]);

  const fullHearts = new Array(currentNumberOfLives)
    .fill(undefined)
    .map((_, i) => {
      return (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={classes.icons}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      );
    });

  const emptyHearts = new Array(numberEmptyHearts)
    .fill(undefined)
    .map((_, i) => {
      return (
        <svg
          key={i * 100}
          xmlns="http://www.w3.org/2000/svg"
          className={`${classes.icons} ${animate ? classes.emptyHearts : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      );
    });

  return (
    <div className={`${classes.container} ${className} `}>
      <div>{fullHearts}</div>
      <div>{emptyHearts}</div>
    </div>
  );
}
