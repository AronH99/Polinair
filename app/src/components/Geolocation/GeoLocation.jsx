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
  setSearchresults,
}) => {
  useEffect(() => {
    if (!isGeolocationAvailable) {
      alert("Your browser does not support Geolocation");
    }
    if (!isGeolocationEnabled) {
      alert("Location is disabled");
      setLon(4.3517103);
      setLat(50.8503396);
    }
    if (coords || isGeolocationEnabled) {
      setLat(coords.latitude);
      setLon(coords.longitude);
      setSearchresults("Your Location's Data");
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
      setSearchresults("Your Location's Data");
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
