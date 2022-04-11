import { useState, useEffect, React } from "react";
import useAxios from "axios-hooks";
import CityLocationRequest from "./components/CityLocationRequest/CityLocationRequest";
import Navbar from "./components/Navbar/Navbar";
import SelectDays from "./components/SelectDays/SelectDays";
import InformationCards from "./components/InformationCards/InformationCards";
import GeoLocation from "./components/Geolocation/GeoLocation";
import MapboxSearchField from "./components/MapboxSearchField/MapboxSearchField";
import SelectMethodLocation from "./components/SelectMethodLocation/SelectMethodLocation";
import Map from "./components/Map/Map";
import "./style.scss";

const apiuitbreiding =
  "https://api.breezometer.com/pollen/v2/forecast/daily?lat=48.857456&lon=2.354611&days=3&key=8496f755e9fb4717970612a504b952f3&features=types_information,plants_information";

const App = () => {
  const [days, setDays] = useState(1);
  const [lat, setLat] = useState(50.8503396);
  const [lon, setLon] = useState(4.3517103);
  const [locationbool, setLocationbool] = useState(true);
  const [searchresults, setSearchresults] = useState();

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
      <SelectDays setDays={setDays}>
        {/*  {!locationbool && (
          <CityLocationRequest
            setLat={setLat}
            setLon={setLon}
            setInput={setInput}
            input={input}
          />
        )} */}
      </SelectDays>
      <SelectMethodLocation
        setLocationbool={setLocationbool}
        setSearchresults={setSearchresults}
      />
      {!locationbool && (
        <MapboxSearchField
          setLat={setLat}
          setLon={setLon}
          setSearchresults={setSearchresults}
        />
      )}
      {locationbool && <GeoLocation setLat={setLat} setLon={setLon} />}
      <Map lat={lat} lon={lon}></Map>
      <InformationCards
        error={error}
        loading={loading}
        standarddata={standarddata}
        searchresults={searchresults}
      />
    </>
  );
};

export default App;
