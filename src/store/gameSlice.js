import { createSlice } from "@reduxjs/toolkit";
import { START, END } from "./action-name-constants";
// import { current } from "@reduxjs/toolkit";

const gameInitial = {
  data: [],
  gameplay: {
    game: {
      hasStarted: false,
    },
    lives: {
      maxLives: 3,
      currentLiveNumber: 3,
      isDead: false,
    },
    level: {
      currentLevel: 1,
      isFinished: false,
      levelNumber: 10,
    },
  },
  countries: {
    toFind: [],
    found: [],
    fourRandom: [],
    theOneToGess: { id: undefined },
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState: gameInitial,
  reducers: {
    loadInitialData(state, action) {
      const rawData = action.payload;
      const dataToSort = [];
      let id = 0;
      rawData.forEach(country => {
        if (country.independent)
          dataToSort.push({
            id: id,
            name: country.name.common,
            nameOfficial: country.name.official,
            nameFrench: {
              official: country.translations.fra.official,
              common: country.translations.fra.common,
            },
            capital: country.capital[0],
            continent: country.continents[0],
            flag: country.flags.svg,
            population: country.population,
          });
        id++;
      });
      const data = dataToSort.sort((a, b) => b.population - a.population);
      const totalNumberOfCountries = data.length;
      const numberOfLevels = state.gameplay.level.levelNumber;
      const numberOfCountryPerLevel = Math.ceil(
        totalNumberOfCountries / numberOfLevels
      );
      const levels = new Array(numberOfLevels).fill(undefined).map((_, i) => {
        return data.slice(
          i * numberOfCountryPerLevel,
          (i + 1) * numberOfCountryPerLevel
        );
      });
      state.data = levels;

      // Loads the levels
      state.countries.toFind =
        state.data[state.gameplay.level.currentLevel - 1];
    },

    startOrEndGame(state, action) {
      if (action.payload === START) state.gameplay.game.hasStarted = true;
      if (action.payload === END) {
        state.gameplay.game.hasStarted = false;
        state.gameplay.level.currentLevel = 1;
        state.countries.toFind = state.data[0];
        state.gameplay.lives.isDead = false;
        state.gameplay.lives.currentLiveNumber = state.gameplay.lives.maxLives;
        state.countries.found = [];
      }
    },

    selectFourRandomCountries(state) {
      state.countries.fourRandom = [];
      state.countries.theOneToGess = { id: undefined };

      // If there's MORE than 4 countries left to guess
      // take 4 randomly in array "toFind"
      if (state.countries.toFind.length >= 4) {
        const indexSet = new Set();
        while (indexSet.size < 4) {
          const index = Math.floor(
            Math.random() * state.countries.toFind.length
          );
          indexSet.add(index);
        }

        indexSet.forEach(index => {
          state.countries.fourRandom.push(state.countries.toFind[index]);
        });

        // Choose which one to guess
        state.countries.theOneToGess.id =
          state.countries.fourRandom[
            Math.floor(Math.random() * state.countries.fourRandom.length)
          ].id;

        // If there is less than 4 countries to guess
      } else {
        if (state.countries.toFind.length === 0) return;

        // Put all the "toFind" in "fourRandom"
        state.countries.fourRandom = [...state.countries.toFind];

        // Select one randomly
        const indexToFind = Math.floor(
          Math.random() * state.countries.fourRandom.length
        );
        // Save the id of the one to guess
        state.countries.theOneToGess.id =
          state.countries.fourRandom[indexToFind].id;

        // Determines how many are missing to have 4 to present
        const numMissingCountry = 4 - state.countries.fourRandom.length;

        // Takes this number in "found"
        const indexSet = new Set();

        while (indexSet.size < numMissingCountry) {
          const index = Math.floor(
            Math.random() * state.countries.found.length
          );
          indexSet.add(index);
        }

        indexSet.forEach(index =>
          state.countries.fourRandom.push(state.countries.found[index])
        );

        // Shuffles the "fourRandom" array
        for (let i = state.countries.fourRandom.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * i);
          let k = state.countries.fourRandom[i];
          state.countries.fourRandom[i] = state.countries.fourRandom[j];
          state.countries.fourRandom[j] = k;
        }
      }
    },

    oneCountryWasGuessed(state, action) {
      const toFind = state.countries.toFind;
      const theOneToGuess = state.countries.theOneToGess.id;
      const gessedId = action.payload;
      if (toFind.length === 0) return;

      if (gessedId === theOneToGuess) {
        const theFoundOne = toFind.find(
          country => country.id === theOneToGuess
        );
        state.countries.found.push(theFoundOne);
        state.countries.toFind = toFind.filter(
          country => country.id !== theOneToGuess
        );

        if (toFind.length === 1) {
          state.gameplay.level.currentLevel += 1;
          state.gameplay.level.isFinished = true;
        }
      }
    },

    loseOneLife(state) {
      if (state.gameplay.lives.currentLiveNumber === 1) {
        state.gameplay.lives.currentLiveNumber--;
        state.gameplay.lives.isDead = true;
        return;
      }
      state.gameplay.lives.currentLiveNumber--;
    },

    reborn(state) {
      if (state.gameplay.level.isFinished) {
        state.gameplay.level.isFinished = false;
      }

      // Case where Game is finished and Start from beginning
      if (
        state.gameplay.level.currentLevel > state.gameplay.level.levelNumber
      ) {
        state.gameplay.level.currentLevel = 1;
        state.countries.toFind = state.data[0];
      }

      if (state.gameplay.level.currentLevel <= state.gameplay.level.levelNumber)
        state.countries.toFind =
          state.data[state.gameplay.level.currentLevel - 1];

      state.gameplay.lives.isDead = false;
      state.gameplay.lives.currentLiveNumber = state.gameplay.lives.maxLives;
      state.countries.found = [];
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
