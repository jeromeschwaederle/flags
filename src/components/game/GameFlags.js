import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";

import classes from "./GameFlags.module.css";
import { gameActions } from "../../store/gameSlice";

export default function GameFlags() {
  const dispatch = useDispatch();
  const leftToGuess = useSelector(state => state.game.countries.toFind);
  console.log(leftToGuess);
  const guessed = useSelector(state => state.game.countries.found);
  console.log(guessed);

  useEffect(() => {
    dispatch(gameActions.selectFourRandomCountries());
  }, [dispatch]);

  const fourCountries = useSelector(state => state.game.countries.fourRandom);
  const countryToFind =
    fourCountries[Math.floor(Math.random() * fourCountries.length)];

  const clickHandler = event => {
    if (event.target.src === countryToFind.flag) {
      console.log("BIEN JOUER !!!!");
      dispatch(gameActions.oneCountryWasGuessed(countryToFind.id));
      dispatch(gameActions.selectFourRandomCountries());
    }
  };

  const flags = fourCountries.map((country, index) => {
    const appliedClasses = classes[`country-${index}`];
    return (
      <div
        onClick={clickHandler}
        key={country.id}
        id={country.id}
        className={`${appliedClasses} ${classes.country}`}
      >
        <img
          className={classes.img}
          src={country.flag}
          alt={`The flag of ${country.name}`}
        ></img>
        {/* <p>{country.name}</p> */}
      </div>
    );
  });

  return (
    <Fragment>
      {flags}
      <p className={classes.countryToFind}>
        {countryToFind?.nameFrench.common}
      </p>
    </Fragment>
  );
}
