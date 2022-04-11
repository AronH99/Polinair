import { geolocated } from "react-geolocated";
import { useEffect } from "react";

const GeoLocation = ({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
  setLat,
  setLon,
  locationbool,
}) => {
  useEffect(() => {
    if (!isGeolocationAvailable) {
      alert("Your browser does not support Geolocation");
    }
    if (!isGeolocationEnabled) {
      alert("This application needs your Location to function properly");
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
})(GeoLocation);
