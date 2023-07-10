import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

const CountryList = () => {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by cliking on it on the map!" />
    );

  const countries = cities.reduce((acc, el) => {
    if (acc.find((country) => country.country === el.country)) {
      return acc;
    }

    return [...acc, { country: el.country, emoji: el.emoji }];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((el) => (
        <CountryItem country={el} key={el.country} />
      ))}
    </ul>
  );
};
export default CountryList;
