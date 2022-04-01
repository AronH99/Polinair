import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import axios from "axios";
import CityRequest from "./Components/CityRequest";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Body from "./components/Body";
import Test from "./components/Test";
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
  const [chosenCity, setChosenCity] = useState();
  const [input2, setInput2] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const { data } = await axios(
          `https://api.breezometer.com/pollen/v2/forecast/daily?lat=${lat2}&lon=${lon2}&key=8496f755e9fb4717970612a504b952f3&days=${input}`
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
  }, [input, lat2, lon2]);

  return (
    <>
      {/*  <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" element={<Body />} />
          <Route path="/Test" element={<Test />} />
        </Switch>
      </BrowserRouter> */}
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
          setError={setError}
          error={error}
          setChosenCity={setChosenCity}
          input2={input2}
          setInput2={setInput2}
          city={city}
          setCity={setCity}
          lat={lat}
          lon={lon}
          chosenCity={chosenCity}
        />
      </Form>
      <Location setLat={setLat} setLon={setLon} />
      <Body
        standarddata={standarddata}
        error={error}
        loading={loading}
        chosenCity={chosenCity}
      />
    </>
  );
};

export default App;
