import "./mapboxsearchfield.scss";
import { React, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

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
    });

    search?.current.on("clear", () => {
      setLon(4.3517103);
      setLat(50.8503396);
      setSearchresults("Brussel");
    });
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
