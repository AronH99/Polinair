import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY =
  "pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w";

const CityRequest = ({
  setLat2,
  setLon2,
  lon2,
  lat2,
  setError,
  error,
  setChosenCity,
  input2,
  setInput2,
  city,
  setCity,
  lat,
  lon,
  chosenCity,
}) => {
  useEffect(() => {
    (async function getCoordinates() {
      axios(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${chosenCity}.json?access_token=${API_KEY}`
      ).then((res) => {
        if (res.data.features.length > 0) {
          setLon2(res.data.features[0].geometry.coordinates[0]);
          setLat2(res.data.features[0].geometry.coordinates[1]);
        } else {
          setLat2(lat);
          setLon2(lon);
        }
        console.log(lon2, lat2);
        console.log("uitgevoerd");
      });
    })();
  }, [chosenCity]);

  return (
    <form
      className="form2"
      onSubmit={(e) => {
        e.preventDefault();
        if (city.length < 4) {
          setError(false);
          setChosenCity();
          setInput2("");
        } else {
          setError(false);
          setChosenCity(city);
          setInput2(city);
        }
      }}
    >
      <h2>Enter a city name : {input2}</h2>
      <div class="flex2">
        <input
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          className={error ? "error" : ""}
        />
        <button className="errorbutton" disabled={error}>
          Go
        </button>
      </div>
    </form>
  );
};

export default CityRequest;
