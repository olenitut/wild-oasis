import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useState } from "react";

const CityList = () => {
  const { cities, isLoading } = useCities();
  const [currentCity, setCurrentCity] = useState({});

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by cliking on it on the map!" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((el) => (
        <CityItem
          city={el}
          key={el.id}
          setCurrent={setCurrentCity}
          currentCity={currentCity}
        />
      ))}
    </ul>
  );
};
export default CityList;
