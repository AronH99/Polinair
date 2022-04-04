import { useState, useEffect, React } from "react";
import useAxios from "axios-hooks";
import CityRequest from "./components/CityLocationRequest/CityLocationRequest";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Interface/Interface";
import Body from "./components/Body/Body";
import GeoLocation from "./components/Geolocation/GeoLocation";
import RadioButton from "./components/RadioButton/RadioButton";
import "./style.scss";

const apiuitbreiding =
  "https://api.breezometer.com/pollen/v2/forecast/daily?lat=48.857456&lon=2.354611&days=3&key=8496f755e9fb4717970612a504b952f3&features=types_information,plants_information";

const App = () => {
  const [days, setDays] = useState(1);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [input, setInput] = useState("");
  const [locationbool, setLocationbool] = useState(true);

  const [{ data: standarddata, loading, error }, fetchBreezoData] = useAxios(
    `https://api.breezometer.com/pollen/v2/forecast/daily?lat=${lat}&lon=${lon}&key=8496f755e9fb4717970612a504b952f3&days=${days}`,
    { manual: true }
  );

  useEffect(() => {
    if (days && lat && lon) {
      fetchBreezoData();
    }
  }, [days, lat, lon]);

  return (
    <>
      <Navbar />
      <RadioButton
        setLocationbool={setLocationbool}
        locationbool={locationbool}
        setInput={setInput}
      />
      <Form setDays={setDays}>
        {!locationbool && (
          <CityRequest
            setLat={setLat}
            setLon={setLon}
            setInput={setInput}
            input={input}
          />
        )}
      </Form>
      {locationbool && <GeoLocation setLat={setLat} setLon={setLon} />}
      <Body
        error={error}
        loading={loading}
        standarddata={standarddata}
        input={input}
      />
    </>
  );
};

export default App;
