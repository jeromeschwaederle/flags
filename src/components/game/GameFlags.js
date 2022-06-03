import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";

import classes from "./GameFlags.module.css";
import { countriesActions } from "../../store/countriesSlice";
import GameImg from "./GameImg";

export default function GameFlags() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countriesActions.selectFourRandomCountries());
  }, [dispatch]);

  const theOneToGessId = useSelector(
    state => state.countries.countries.theOneToGess.id
  );
  const fourCountries = useSelector(
    state => state.countries.countries.fourRandom
  );
  const countryToFind = fourCountries.find(
    country => country.id === theOneToGessId
  );

  const clickHandler = event => {
    if (Number(event.target.id) === theOneToGessId) {
      dispatch(countriesActions.oneCountryWasGuessed(theOneToGessId));
      dispatch(countriesActions.selectFourRandomCountries());
    } else {
      console.log("💥💥💥💥💥💥💥💥💥💥");
    }
  };

  const flags = fourCountries.map((country, index) => {
    const appliedClasses = classes[`country-${index}`];
    return (
      <div
        className={`${appliedClasses} ${classes.country}`}
        onClick={clickHandler}
        key={country.id}
        id={country.id}
      >
        <GameImg
          id={country.id}
          className={classes.img}
          src={country.flag}
          alt={`The flag of ${country.name}`}
        />
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
