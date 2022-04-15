import { useState, React } from "react";
import Navbar from "./components/Navbar/Navbar";
import SelectDays from "./components/SelectDays/SelectDays";
import InformationCards from "./components/InformationCards/InformationCards";
import GeoLocation from "./components/Geolocation/GeoLocation";
import MapboxSearchField from "./components/MapboxSearchField/MapboxSearchField";
import SelectMethodLocation from "./components/SelectMethodLocation/SelectMethodLocation";
import Map from "./components/Map/Map";
import ChoosePollen from "./components/ChoosePollen/ChoosePollen";
import {
  getDays,
  getChooseType,
  getLocationBool,
} from "./HelperFunctions/LocalStorage";
import "./style.scss";

const App = () => {
  const [days, setDays] = useState(getDays() || 1);
  const [choosetype, setChooseType] = useState(getChooseType() || "tree");
  const [locationbool, setLocationbool] = useState(getLocationBool() || true);
  const [lat, setLat] = useState(50.8503396);
  const [lon, setLon] = useState(4.3517103);
  const [searchresults, setSearchresults] = useState();
  const [toggleyourlocation, setToggleYourLocation] = useState(false);

  return (
    <>
      <Navbar />
      {locationbool && (
        <GeoLocation
          setLat={setLat}
          setLon={setLon}
          toggleyourlocation={toggleyourlocation}
          setSearchresults={setSearchresults}
        />
      )}
      <SelectMethodLocation
        setLocationbool={setLocationbool}
        setSearchresults={setSearchresults}
        toggleyourlocation={toggleyourlocation}
        setToggleYourLocation={setToggleYourLocation}
        locationbool={locationbool}
      />
      {!locationbool && (
        <MapboxSearchField
          setLat={setLat}
          setLon={setLon}
          setSearchresults={setSearchresults}
        />
      )}
      <Map lat={lat} lon={lon} choosetype={choosetype}>
        <ChoosePollen setChooseType={setChooseType} choosetype={choosetype} />
      </Map>
      <InformationCards
        lat={lat}
        lon={lon}
        searchresults={searchresults}
        days={days}
      >
        <SelectDays setDays={setDays} days={days} />
      </InformationCards>
    </>
  );
};

export default App;
