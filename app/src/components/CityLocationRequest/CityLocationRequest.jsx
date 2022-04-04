import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import "./citylocationrequest.scss";

const API_KEY =
  "pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w";

const CityRequest = ({ setLat, setLon, setInput, input }) => {
  const [formerror, setFormerror] = useState(false);
  const [city, setCity] = useState();
  const [chosenCity, setChosenCity] = useState();

  const [{ data, loading, error }, fetchLatLonData] = useAxios(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${chosenCity}.json?access_token=${API_KEY}`,
    { manual: true }
  );

  useEffect(() => {
    fetchLatLonData();
    if (data?.features.length > 0) {
      setLon(data?.features[0].geometry.coordinates[0]);
      setLat(data?.features[0].geometry.coordinates[1]);
    }
  }, [chosenCity]);

  if (loading)
    return (
      <div className="form2">
        <div className="flex2">
          <p className="loadingp">Loading...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex2">
        <p className="form2">Error !!!</p>
      </div>
    );

  return (
    <form
      className="form2"
      onSubmit={(e) => {
        e.preventDefault();
        setChosenCity(city);
        setInput(city);
      }}
    >
      <h2>Enter a city name : {input}</h2>
      <div className="flex2">
        <input
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value.length < 3) {
              setFormerror(true);
            } else if (e.target.value.length >= 3) {
              setFormerror(false);
            }
          }}
        />
        <button className="errorbutton" disabled={formerror}>
          Go
        </button>
      </div>
    </form>
  );
};

export default CityRequest;
