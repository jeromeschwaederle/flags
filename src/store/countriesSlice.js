import { createSlice } from "@reduxjs/toolkit";
// import { current } from "@reduxjs/toolkit";

const countriesInitial = {
  data: [],

  countries: {
    toFind: [],
    found: [],
    fourRandom: [],
    theOneToGess: { id: undefined },
  },
};

const gameSlice = createSlice({
  name: "countries",
  initialState: countriesInitial,
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

      state.data = dataToSort.sort((a, b) => b.population - a.population);
      state.countries.toFind = state.data;
    },

    // TO DO METTRE DANS LE PAYLOAD LE NIVEAU ACTUEL
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
      if (state.countries.toFind.length === 0) return;
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

export const countriesActions = gameSlice.actions;
export default gameSlice.reducer;
