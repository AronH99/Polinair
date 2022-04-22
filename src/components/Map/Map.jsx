import "./map.scss";
import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w";

const Map = ({ lat, lon, children, choosetype }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);
  const marker = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lon, lat],
      zoom: zoom,
      scrollZoom: { around: "center" },
      touchZoomRotate: { around: "center" },
      maxZoom: 14,
      minZoom: 5,
    });
  }, [lat, lon]);

  useEffect(() => {
    if (map?.current && lon && lat) {
      map?.current.easeTo({
        center: [lon, lat],
        zoom: zoom,
        speed: 0.2,
        curve: 1,
        duration: 2000,
      });
    }
  }, [lon, lat]);

  useEffect(() => {
    if (marker?.current) {
      marker?.current.remove();
    }
    marker.current = new mapboxgl.Marker()
      .setLngLat([lon, lat])
      .addTo(map?.current);
  }, [lon, lat]);

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

  useEffect(() => {
    map?.current.on("load", function () {
      addRasterSource();
      addRasterLayer();
    });
  }, []);

  useEffect(() => {
    if (map?.current.getLayer("breezometer-tiles")) {
      map?.current.removeLayer("breezometer-tiles");
      map?.current.removeSource("breezometer-tiles");
      addRasterSource();
      addRasterLayer();
    }
  }, [choosetype]);

  return (
    <div className="component-container">
      <div ref={mapContainer} className="map-container" />
      <ul class="legend">
        <li>
          <span class="green"></span> Very Low
        </li>
        <li>
          <span class="lightgreen"></span> Low
        </li>
        <li>
          <span class="yellow"></span> Moderate
        </li>
        <li>
          <span class="orange"></span> High
        </li>
        <li>
          <span class="red"></span> Very High
        </li>
      </ul>
      {children}
    </div>
  );
};

export default Map;
