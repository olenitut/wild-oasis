import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
const ukraineCoords = [48.383, 31.1829];

const Map = () => {
  const mapRef = useRef();

  const navigate = useNavigate();
  const { cities } = useCities();

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    navigate(`form?lat=${lat}&lng=${lng}`);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleClick,
    });

    return null;
  };

  useEffect(() => {
    if (mapRef.current && lat && lng) {
      mapRef?.current?.setView([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <MapContainer
      ref={mapRef}
      className={styles.mapContainer}
      center={ukraineCoords}
      zoom={3}
      onClick={handleClick}
    >
      <MapClickHandler />
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
      {cities.length &&
        cities.map((el) => (
          <Marker key={el.id} position={[el?.position?.lat, el?.position?.lng]}>
            <Popup>
              {el.cityName} <br /> {el.notes}.
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};
export default Map;
`~`;
