import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect, useState } from "react";
import Button from "./Button";
import Loader from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const [city, setCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { cityName, emoji, date, notes } = city;

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/cities/${id}`)
      .then((res) => res.json())
      .then((data) => setCity(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className={styles.city}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              <span>{emoji}</span> {cityName}
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date || null)}</p>
          </div>

          {notes && (
            <div className={styles.row}>
              <h6>Your notes</h6>
              <p>{notes}</p>
            </div>
          )}

          <div className={styles.row}>
            <h6>Learn more</h6>
            <a
              href={`https://en.wikipedia.org/wiki/${cityName}`}
              target="_blank"
              rel="noreferrer"
            >
              Check out {cityName} on Wikipedia &rarr;
            </a>
          </div>

          <div>
            <Button type="back" onCLick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default City;
