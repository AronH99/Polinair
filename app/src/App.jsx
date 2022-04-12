import { useState, useEffect, React } from "react";
import useAxios from "axios-hooks";
import Navbar from "./components/Navbar/Navbar";
import SelectDays from "./components/SelectDays/SelectDays";
import InformationCards from "./components/InformationCards/InformationCards";
import GeoLocation from "./components/Geolocation/GeoLocation";
import MapboxSearchField from "./components/MapboxSearchField/MapboxSearchField";
import SelectMethodLocation from "./components/SelectMethodLocation/SelectMethodLocation";
import Map from "./components/Map/Map";
import ChoosePollen from "./components/ChoosePollen/ChoosePollen";
import "./style.scss";

const apiuitbreiding =
  "https://api.breezometer.com/pollen/v2/forecast/daily?lat=48.857456&lon=2.354611&days=3&key=1543d470bf7e4ae5b443dd17833ff9a4&features=types_information,plants_information";

const App = () => {
  const [days, setDays] = useState(1);
  const [lat, setLat] = useState(50.8503396);
  const [lon, setLon] = useState(4.3517103);
  const [locationbool, setLocationbool] = useState(true);
  const [searchresults, setSearchresults] = useState();
  const [toggleyourlocation, setToggleYourLocation] = useState(false);
  const [choosetype, setChooseType] = useState("tree");

  /*   const [{ data: standarddata, loading, error }, fetchBreezoData] = useAxios(
    `https://api.breezometer.com/pollen/v2/forecast/daily?lat=${lat}&lon=${lon}&key=1543d470bf7e4ae5b443dd17833ff9a4&days=${days}`,
    { manual: true }
  );

  useEffect(() => {
    if (days && lat && lon) {
      fetchBreezoData();
    }
  }, [days, lat, lon]); */

  return (
    <>
      <Navbar />
      <GeoLocation
        setLat={setLat}
        setLon={setLon}
        toggleyourlocation={toggleyourlocation}
      />
      <SelectMethodLocation
        setLocationbool={setLocationbool}
        setSearchresults={setSearchresults}
        toggleyourlocation={toggleyourlocation}
        setToggleYourLocation={setToggleYourLocation}
      />
      {!locationbool && (
        <MapboxSearchField
          setLat={setLat}
          setLon={setLon}
          setSearchresults={setSearchresults}
          searchresults={searchresults}
        />
      )}
      <Map lat={lat} lon={lon} choosetype={choosetype}>
        <ChoosePollen setChooseType={setChooseType} choosetype={choosetype} />
      </Map>
      {/* <InformationCards
        error={error}
        loading={loading}
        standarddata={standarddata}
        searchresults={searchresults}
      >
        <SelectDays setDays={setDays} />
      </InformationCards> */}
    </>
  );
};

export default App;
