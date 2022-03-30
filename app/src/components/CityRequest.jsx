import React, { useState } from "react";
import axios from "axios";

const CityRequest = ({ setLat, setLon }) => {
  const [city, setCity] = useState("Putte");
  const API_KEY =
    "pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w";

  async function getCoordinates() {
    axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${API_KEY}`
    ).then((res) => {
      setLon(res.data.features[0].geometry.coordinates[0]);

      setLat(res.data.features[0].geometry.coordinates[1]);
      console.log(lon, lat);
    });
  }

  return (
    <div className="box">
      <h2>Enter a city name</h2>
      <input
        type="text"
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <button onClick={() => getCoordinates()}>Go</button>
    </div>
  );
};

export default CityRequest;
