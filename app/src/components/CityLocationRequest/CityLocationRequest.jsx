import React, { useState, useEffect } from "react";
import axios from "axios";
import "./citylocationrequest.scss";

const API_KEY =
  "pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w";

const CityRequest = ({
  setLat2,
  setLon2,
  setChosenCity,
  chosenCity,
  lat,
  lon,
}) => {
  const [formerror, setFormerror] = useState(false);
  const [input2, setInput2] = useState("");
  const [city, setCity] = useState("");

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
      });
    })();
  }, [chosenCity]);

  return (
    <form
      className="form2"
      onSubmit={(e) => {
        e.preventDefault();
        if (chosenCity?.length < 4) {
          setChosenCity();
          setInput2("");
          setFormerror(true);
        } else {
          setChosenCity(city);
          setInput2(city);
          setFormerror(false);
        }
      }}
    >
      <h2>Enter a city name : {input2}</h2>
      <div className="flex2">
        <input
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          className={formerror ? "error" : ""}
        />
        <button className="errorbutton" disabled={formerror}>
          Go
        </button>
      </div>
    </form>
  );
};

export default CityRequest;
