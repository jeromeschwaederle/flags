import { gameActions } from "./gameSlice";
import { TRUE, FALSE } from "./ActionNames";

export const fetchInitialData = () => {
  return async dispatch => {
    const request = async () => {
      try {
        dispatch(gameActions.setIsLoading);
        console.log("LOADING DATA");
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) throw new Error("💥 Something went wrong");

        const data = await response.json();

        return data;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    };

    try {
      dispatch(gameActions.setIsLoading(TRUE));
      const data = await request();
      dispatch(gameActions.loadInitialData(data));
      dispatch(gameActions.setIsLoading(FALSE));
    } catch (error) {
      dispatch(gameActions.setIsLoading(FALSE));
      console.error(error);
    }
  };
};
