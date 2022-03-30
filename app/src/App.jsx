import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import CityRequest from "./Components/CityRequest";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Body from "./components/Body";
import Location from "./components/Location";
import "../style.scss";

const apiuitbreiding =
  "https://api.breezometer.com/pollen/v2/forecast/daily?lat=48.857456&lon=2.354611&days=3&key=8496f755e9fb4717970612a504b952f3&features=types_information,plants_information";

const App = () => {
  const [standarddata, setStandardData] = useState({ data: [] });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(1);
  const [counter, setCounter] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [lat2, setLat2] = useState();
  const [lon2, setLon2] = useState();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const { data } = await axios(
          `https://api.breezometer.com/pollen/v2/forecast/daily?lat=${
            lat2 ? lat2 : lat
          }&lon=${
            lon2 ? lon2 : lon
          }&key=8496f755e9fb4717970612a504b952f3&days=${input}`
        );
        setLoading(false);
        setError(false);
        setStandardData(data);
      } catch (error) {
        setError(true);
        setLoading(false);
        setStandardData({ data: [] });
      }
    })();
  }, [input]);

  return (
    <>
      <Navbar />
      <Form
        counter={counter}
        setInput={setInput}
        setCounter={setCounter}
        input={input}
      >
        <CityRequest
          setLat2={setLat2}
          setLon2={setLon2}
          lon2={lon2}
          lat2={lat2}
        />
      </Form>
      <Location setLat={setLat} setLon={setLon} />
      <Body standarddata={standarddata} error={error} loading={loading} />
    </>
  );
};

export default App;
