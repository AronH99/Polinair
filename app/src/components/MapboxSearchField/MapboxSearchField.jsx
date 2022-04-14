import "./mapboxsearchfield.scss";
import { React, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import {
  setLocalStorageData,
  getLocalStorageData,
} from "../../hooks/LocalStorage";

const MapboxSearchField = ({ setLat, setLon, setSearchresults }) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w";

  const search = useRef();

  useEffect(() => {
    if (search.current) return;
    search.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: "country,region,place,postcode,locality,neighborhood",
    });

    search?.current.addTo("#geocoder-container");

    search?.current.on("result", (e) => {
      setLon(e.result?.center[0]);
      setLat(e.result?.center[1]);
      setSearchresults(e.result?.place_name);
      //localstorage
      setLocalStorageData("lon", e.result?.center[0]);
      setLocalStorageData("lat", e.result?.center[1]);
      setLocalStorageData("placename", e.result?.place_name);
    });

    search?.current.on("clear", () => {
      setLon(4.3517103);
      setLat(50.8503396);
      setSearchresults("Brussel");
      //localstorage
      const json = JSON.stringify("");
      const json2 = JSON.stringify("");
      const json3 = JSON.stringify("");
      localStorage.setItem("lon", json);
      localStorage.setItem("lat", json2);
      localStorage.setItem("placename", json3);
    });
  }, []);

  useEffect(() => {
    const lon = getLocalStorageData("lon");
    const lat = getLocalStorageData("lat");
    const placename = getLocalStorageData("placename");
    if (lon || lat || placename) {
      setLon(lon);
      setLat(lat);
      setSearchresults(placename);
      search?.current.setInput(placename);
    }
  }, []);

  return (
    <div
      id="MapboxSearchFieldBackground"
      className="MapboxSearchFieldBackground"
    >
      <div id="geocoder-container" className="geocoder" />
    </div>
  );
};

export default MapboxSearchField;
