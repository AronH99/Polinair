import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY =
  "pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w";

const CityRequest = ({ setLat2, setLon2, lon2, lat2 }) => {
  const [city, setCity] = useState("Antwerpen");

  useEffect(() => {
    (async function getCoordinates() {
      axios(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${API_KEY}`
      ).then((res) => {
        setLon2(res.data.features[0].geometry.coordinates[0]);
        setLat2(res.data.features[0].geometry.coordinates[1]);
        console.log(lon2, lat2);
      });
    })();
  }, [city]);

  return (
    <form
      className="form2"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>Enter a city name</h2>
      <input
        type="text"
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
    </form>
  );
};

export default CityRequest;
