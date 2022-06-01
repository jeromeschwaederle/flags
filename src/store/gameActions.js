import { gameActions } from "./gameSlice";
import { TRUE, FALSE } from "./ActionNames";

const request = async (url, type = "JSON") => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("💥 Something went wrong");
    if (type === "JSON") {
      const data = await response.json();
      return data;
    }
    if (type === "TEXT") {
      const data = await response.text();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const fetchInitialData = () => {
  const url = "https://restcountries.com/v3.1/all";
  return async dispatch => {
    try {
      dispatch(gameActions.setIsLoading(TRUE));
      const data = await request(url);
      dispatch(gameActions.loadInitialData(data));
      dispatch(gameActions.setIsLoading(FALSE));
    } catch (error) {
      dispatch(gameActions.setIsLoading(FALSE));
      console.error(error);
    }
  };
};

export const setSVGs = (SVGurl, countryName) => {
  return async dispatch => {
    try {
      const svg = await request(SVGurl, "TEXT");
      dispatch(gameActions.setSVGs({ svg, countryName }));
    } catch (error) {
      console.error(error);
    }
  };
};
