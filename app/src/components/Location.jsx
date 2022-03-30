import React from "react";
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
    if (coords) {
      setLat(coords.latitude);
      setLon(coords.longitude);
    }
  }, [coords]);

  return !isGeolocationAvailable ? (
    <h3>Your browser does not support Geolocation</h3>
  ) : !isGeolocationEnabled ? (
    <h3>Geolocation is not enabled</h3>
  ) : coords ? (
    <section className="Location">
      <table>
        <tbody>
          <tr>
            <td>latitude</td>
            <td>{coords.latitude}</td>
          </tr>
          <tr>
            <td>longitude</td>
            <td>{coords.longitude}</td>
          </tr>
        </tbody>
      </table>
    </section>
  ) : (
    ""
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Location);
