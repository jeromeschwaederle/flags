import { createSlice } from "@reduxjs/toolkit";
import { START, END, TRUE, FALSE } from "./ActionNames";
// import { current } from "@reduxjs/toolkit";

const gameInitial = {
  isLoading: false,
  hasStarted: false,
  lives: 2,
  level: 0,
  data: [],
  countries: {
    toFind: [],
    found: [],
    fourRandom: [],
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState: gameInitial,
  reducers: {
    setIsLoading(state, action) {
      if (action.payload === TRUE) state.isLoading = true;
      if (action.payload === FALSE) state.isLoading = false;
    },

    startOrEndGame(state, action) {
      if (action.payload === START) state.hasStarted = true;
      if (action.payload === END) state.hasStarted = false;
    },

    loadInitialData(state, action) {
      const data = action.payload;
      console.log(data);
      let id = 0;
      data.forEach(country => {
        if (country.independent && country.continents[0] === "Europe")
          state.data.push({
            id: id,
            name: country.name.common,
            nameOfficial: country.name.official,
            nameFrench: {
              official: country.translations.fra.official,
              common: country.translations.fra.common,
            },
            capital: country.capital[0],
            flag: country.flags.svg,
            population: new Intl.NumberFormat(navigator.language).format(
              country.population
            ),
          });

        id++;

        state.countries.toFind = state.data;
      });
    },

    selectFourRandomCountries(state) {
      state.countries.fourRandom = [];

      const indexSet = new Set();
      if (state.countries.toFind.length > 4) {
        while (indexSet.size < 4) {
          const index = Math.floor(
            Math.random() * state.countries.toFind.length
          );
          indexSet.add(index);
        }
        indexSet.forEach(index => {
          console.log(index);
          state.countries.fourRandom.push(state.countries.toFind[index]);
        });
      } else {
        // Générer un index au hazard dans le range du nombre de pays qu'il reste à deviner
        // en prendre une au hazard
        // Générer 3 index au hazard dans le range du nombre de pays DÉJÀ devinés
        // en prendre 3
        //Pousser les quatre dans l'array "fourRandom"
      }
    },

    oneCountryWasGuessed(state, action) {
      const theFoundOne = state.countries.toFind.find(
        country => country.id === action.payload
      );

      state.countries.found.push(theFoundOne);

      state.countries.toFind = state.countries.toFind.filter(
        country => country.id !== action.payload
      );
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
