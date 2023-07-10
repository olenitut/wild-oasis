import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { isLoading, createCity, fetchCity } = useCities();

  useEffect(() => {
    if (!lat && !lng) return;
    fetchCity(lat, lng)
      .then((data) => {
        setCityName(data.city);
        setCountry(data.countryName);
      })
      .catch((err) => console.log(err));
  }, [lat, lng]);

  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  if (!lat && !lng) {
    return <Message message="Start by clicking on the city on the map" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) {
      return;
    }
    const city = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(city);
    navigate("/app/cities");
  };

  if (isLoading) return <Spinner />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onCLick={handleBack}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
