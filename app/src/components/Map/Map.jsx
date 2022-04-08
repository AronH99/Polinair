import "./map.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w";

const Map = ({
  locationbool,
  setLat,
  setLon,
  lat,
  lon,
  geoloading,
  setSearchresults,
  searchresultsbool,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);
  const [lng, setLng] = useState();
  const [latit, setLatit] = useState();

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: {
      color: "orange",
    },
    mapboxgl: mapboxgl,
  });

  useEffect(() => {
    if (map.current) return;
    geoloading &&
      (map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lon, lat],
        zoom: zoom,
        dragPan: false,
        touchZoomRotate: { around: "center" },
        scrollZoom: { around: "center" },
        maxZoom: 14,
        minZoom: 5,
      }));
    if (map?.current) {
      map?.current.addControl(geocoder);
      map?.current.keyboard.disable();
      map?.current.dragRotate.disable();
      map?.current.dragPan.disable();
      map?.current.doubleClickZoom.disable();
    }
  }, [map?.current, lat, lon]);

  useEffect(() => {
    setSearchresults(
      map.current?._container.childNodes[2].childNodes[1].childNodes[0]
        .childNodes[1].value
    );
  }, [
    map.current?._container.childNodes[2].childNodes[1].childNodes[0]
      .childNodes[1].value,
    searchresultsbool,
  ]);

  useEffect(() => {
    setLat(latit);
    setLon(lng);
  }, [locationbool, latit, lng]);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("moveend", () => {
      setLng(map?.current.getCenter().lng.toFixed(4));
      setLatit(map?.current.getCenter().lat.toFixed(4));
      setZoom(map?.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    if (!map.current) return;
    geoloading &&
      map?.current.on("load", () => {
        map?.current.loadImage(
          "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
          (error, image) => {
            if (error) throw error;
            map?.current.addImage("custom-marker", image);
            map?.current.addSource("points", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [lon, lat],
                    },
                    properties: {
                      title: "Current Location",
                    },
                  },
                ],
              },
            });
            map?.current.addLayer({
              id: "points",
              type: "symbol",
              source: "points",
              layout: {
                "icon-image": "custom-marker",
                "text-field": ["get", "title"],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 1.25],
                "text-anchor": "top",
              },
            });
          }
        );
      });
  });

  return (
    <div className="component-container">
      <div
        ref={mapContainer}
        className={
          !locationbool
            ? "map-container"
            : "map-container map-container--search-disabled"
        }
      />
      <div className="sidebar">
        Longitude: {lng ?? lon} | Latitude: {latit ?? lat} | Zoom: {zoom}
      </div>
    </div>
  );
};

export default Map;
