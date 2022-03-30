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
  const [lat, setLat] = useState(51.22047);
  const [lon, setLon] = useState(4.40026);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const { data } = await axios(
          `https://api.breezometer.com/pollen/v2/forecast/daily?lat=${lat}&lon=${lon}&key=8496f755e9fb4717970612a504b952f3&days=${input}`
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
      />
      <Location setLat={setLat} setLon={setLon} />
      <Body standarddata={standarddata} error={error} loading={loading} />
      {/* <CityRequest setLat={setLat} setLon={setLon} /> */}
    </>
  );
};

export default App;
