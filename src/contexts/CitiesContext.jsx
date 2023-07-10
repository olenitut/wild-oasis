import { useEffect, createContext, useContext, useReducer } from "react";
import axios from "axios";

const CitiesContext = createContext();

const reducer = (curState, action) => {
  switch (action.type) {
    case "loading":
      return { ...curState, isLoading: true };
    case "notLoading":
      return { ...curState, isLoading: false };
    case "cities/loaded":
      return { ...curState, cities: action.payload, isLoading: false };
    case "cities/created":
      return {
        ...curState,
        cities: [...curState.cities, action.payload],
        isLoading: false,
      };
    case "cities/deleted":
      return {
        ...curState,
        cities: curState.cities.filter((el) => el.id !== action.payload),
        isLoading: false,
      };
    default:
      return curState;
  }
};
const initialState = {
  cities: [],
  isLoading: false,
};

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "loading" });
    fetch(`http://localhost:8000/cities`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "cities/loaded", payload: data }))
      .catch((err) => console.log(err));
  }, []);

  const fetchCity = async (lat, lng) => {
    try {
      dispatch({ type: "loading" });

      const res = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "notLoading" });
    }
  };
  const createCity = async (city) => {
    try {
      dispatch({ type: "loading" });
      const newCity = await axios.post("http://localhost:8000/cities", city);
      dispatch({ type: "cities/created", payload: newCity.data });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      await axios.delete(`http://localhost:8000/cities/${id}`);
      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        createCity,
        deleteCity,
        fetchCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  return useContext(CitiesContext);
};

export { CitiesProvider, useCities };
