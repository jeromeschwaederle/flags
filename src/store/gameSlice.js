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
      const numberOfLevels = 10;
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
      state.countries.toFind = state.data[0];
    },

    startOrEndGame(state, action) {
      console.log("GAMEPLAY SLICE");
      if (action.payload === START) state.gameplay.game.hasStarted = true;
      if (action.payload === END) state.gameplay.game.hasStarted = false;
    },

    selectFourRandomCountries(state) {
      state.countries.fourRandom = [];
      state.countries.theOneToGess = { id: undefined };

      // If there's MORE than 4 countries left to guess
      // En prendre 4 au hazard dans l'array "toFind"
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

        // Détermine lequel des 4 sera à deviner
        state.countries.theOneToGess.id =
          state.countries.fourRandom[
            Math.floor(Math.random() * state.countries.fourRandom.length)
          ].id;

        // Si il reste moins de quatre pays à trouver
      } else {
        if (state.countries.toFind.length === 0) return;

        // Mettre tous les "toFind" dans fourRandom
        state.countries.fourRandom = [...state.countries.toFind];

        // J'en sélectionne un au hazard
        const indexToFind = Math.floor(
          Math.random() * state.countries.fourRandom.length
        );
        // Enregistre l'id de celui qu'il faudra deviner
        state.countries.theOneToGess.id =
          state.countries.fourRandom[indexToFind].id;

        // Déterminer combien il manque pour en avoir quatre à présenter
        const numMissingCountry = 4 - state.countries.fourRandom.length;

        // En prendre ce nombre dans "found"
        const indexSet = new Set();

        while (indexSet.size < numMissingCountry) {
          const index = Math.floor(
            Math.random() * state.countries.found.length
          );
          indexSet.add(index);
        }
        console.log(indexSet);

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

        // ######################################################
        // SelectFourRandom Logic
        // ######################################################

        // console.log("toFind.length", toFind.length);
        // // state.countries.toFind = toFind;
        // // state.countries.found = found;
        // if (toFind.length === 1) {
        //   console.log("GO TO NEXT LEVEL");
        //   state.countries.toFind = state.data[0];
        // }
      }
    },

    loseOneLife(state, action) {
      const currentLifeNumber = state.gameplay.lives.currentLiveNumber;
      if (currentLifeNumber === 1) {
        state.gameplay.lives.isDead = true;
        return;
      }
      const updatedLifeNumber = currentLifeNumber - 1;
      state.gameplay.lives.currentLiveNumber = updatedLifeNumber;
    },

    reborn(state) {
      const maxLives = state.gameplay.lives.maxLives;
      state.gameplay.lives.currentLiveNumber = maxLives;
      state.gameplay.lives.isDead = false;
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
