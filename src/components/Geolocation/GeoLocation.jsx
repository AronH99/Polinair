import { geolocated } from "react-geolocated";
import { useEffect } from "react";
/* import {
  getGeoLatGeoLon,
  setGeoLatGeoLon,
  removeGeoLatGeoLon,
} from "../../HelperFunctions/LocalStorage"; */
import { setAlert, getAlert } from "../../HelperFunctions/LocalStorage";

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
      const checkAlert = getAlert();
      if (checkAlert !== "yes") {
        alert("Your browser does not support Geolocation");
        setAlert("yes");
      }
    }
    if (!isGeolocationEnabled) {
      const checkAlert = getAlert();
      if (checkAlert !== "yes") {
        alert("Location is disabled");
        setAlert("yes");
      }
    }
    if (coords && isGeolocationEnabled && isGeolocationAvailable) {
      setLat(coords.latitude);
      setLon(coords.longitude);
      setSearchresults("Your Location's Data");
    }
  }, [coords, toggleyourlocation, isGeolocationEnabled]);

  /*   useEffect(() => {
    if (coords) {
      setGeoLatGeoLon(coords.longtitude, coords.latitude);
    }
  }, [coords]);

  useEffect(() => {
    const geolat = getGeoLatGeoLon()[0];
    const geolon = getGeoLatGeoLon()[1];
    if (geolat && geolon) {
      setLat(geolat);
      setLon(geolon);
      setSearchresults("Your Location's Data");
    }
  }, []); */

  return null;
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoLocation);
