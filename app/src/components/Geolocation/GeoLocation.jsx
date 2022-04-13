import { geolocated } from "react-geolocated";
import { useEffect } from "react";

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
      const json = JSON.stringify(coords.latitude);
      const json2 = JSON.stringify(coords.longitude);
      localStorage.setItem("geolat", json);
      localStorage.setItem("geolon", json2);
    }
  }, [coords]);

  useEffect(() => {
    const json = localStorage.getItem("geolat");
    const json2 = localStorage.getItem("geolon");
    const geolat = JSON.parse(json);
    const geolon = JSON.parse(json2);
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
