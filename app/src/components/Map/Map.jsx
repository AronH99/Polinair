import "./map.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import React, { useRef, useEffect, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w";

const Map = ({ lat, lon, children, choosetype }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);
  const [updateMapLayout, setUpdateMapLayout] = useState(false);

  //initiates map
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lon, lat],
      zoom: zoom,
      dragPan: false,
      scrollZoom: { around: "center" },
      touchZoomRotate: { around: "center" },
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

  //initial pin
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

  const addRasterLayer = () => {
    map?.current.addLayer(
      {
        id: "breezometer-tiles",
        type: "raster",
        source: "breezometer-tiles",
        minzoom: 5,
        maxzoom: 14.1,
        paint: {
          "raster-opacity": 0.6,
        },
      },
      "admin-1-boundary-bg"
    );
  };

  const addRasterSource = () => {
    map?.current.addSource("breezometer-tiles", {
      type: "raster",
      tiles: [
        `https://tiles.breezometer.com/v1/pollen/${choosetype}/forecast/daily/{z}/{x}/{y}.png?key=1543d470bf7e4ae5b443dd17833ff9a4`,
      ],
      tileSize: 256,
      maxzoom: 14,
    });
  };

  //initial load
  useEffect(() => {
    map?.current.on("load", function () {
      addRasterSource();
      addRasterLayer();
    });
  }, []);

  //remove and reload of layout
  useEffect(() => {
    if (map?.current.getLayer("breezometer-tiles")) {
      map?.current.removeLayer("breezometer-tiles");
    }
    if (map?.current.getSource("breezometer-tiles")) {
      map?.current.removeSource("breezometer-tiles");
      setUpdateMapLayout(true);
    }
  }, [choosetype]);

  useEffect(() => {
    updateMapLayout && addRasterSource();
    updateMapLayout && addRasterLayer();
    setUpdateMapLayout(false);
  }, [updateMapLayout]);

  return (
    <div className="component-container">
      <div ref={mapContainer} className="map-container" />
      {children}
    </div>
  );
};

export default Map;
