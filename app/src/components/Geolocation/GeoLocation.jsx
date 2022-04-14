import { geolocated } from "react-geolocated";
import { useEffect } from "react";
import {
  setLocalStorageData,
  getLocalStorageData,
} from "../../hooks/LocalStorage";

const GeoLocation = ({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
  setLat,
  setLon,
  toggleyourlocation,
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
  }, [coords, toggleyourlocation]);

  useEffect(() => {
    if (coords) {
      setLocalStorageData("geolat", coords.latitude);
      setLocalStorageData("geolon", coords.longitude);
    }
  }, [coords]);

  useEffect(() => {
    const geolat = getLocalStorageData("geolat");
    const geolon = getLocalStorageData("geolon");
    if (geolat || geolon) {
      setLat(geolat);
      setLon(geolon);
    }
  }, []);

  return null;
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoLocation);
