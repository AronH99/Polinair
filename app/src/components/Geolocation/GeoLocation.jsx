import { geolocated } from "react-geolocated";
import { useEffect } from "react";

const Location = ({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
  setLat,
  setLon,
}) => {
  useEffect(() => {
    if (!isGeolocationAvailable) {
      alert("Your browser does not support Geolocation");
    }
    if (!isGeolocationEnabled) {
      alert("Geolocation is not enabled");
    }
    if (coords) {
      setLat(coords.latitude);
      setLon(coords.longitude);
    }
  }, [coords]);

  return null;
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Location);
