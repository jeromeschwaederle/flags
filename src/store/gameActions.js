import { uiActions } from "./uiSlice";
import { countriesActions } from "./countriesSlice";
import { TRUE, FALSE } from "./action-name-constants";

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
      dispatch(uiActions.setIsLoading(TRUE));
      const data = await request(url);
      dispatch(countriesActions.loadInitialData(data));
      dispatch(uiActions.setIsLoading(FALSE));
    } catch (error) {
      dispatch(uiActions.setIsLoading(FALSE));
      console.error(error);
    }
  };
};
