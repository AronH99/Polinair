import "./map.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import React, { useRef, useEffect, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w";

const Map = ({ lat, lon }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);

  //initiates map
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lon, lat],
      zoom: zoom,
      dragPan: false,
      touchZoomRotate: { around: "center" },
      scrollZoom: { around: "center" },
      maxZoom: 14,
      minZoom: 5,
    });
    if (map?.current) {
      map?.current.keyboard.disable();
      map?.current.dragRotate.disable();
      map?.current.dragPan.disable();
      map?.current.doubleClickZoom.disable();
    }
  }, [lat, lon]);

  //pans to current location again
  useEffect(() => {
    if ((map?.current, lon, lat)) {
      map?.current.easeTo({
        center: [lon, lat],
        zoom: zoom,
        speed: 0.2,
        curve: 1,
        duration: 2000,
      });
    }
  }, [lon, lat]);

  //blauwe pin
  useEffect(() => {
    if (!map.current) return;
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
                    coordinates: [4.3517103, 50.8503396],
                  },
                  properties: {
                    title: "Brussel",
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
  }, []);

  return (
    <div className="component-container">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
