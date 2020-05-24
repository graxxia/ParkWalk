import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { sortGeoJSON } from "../utils/mapUtil";

const styles = {
  display: "flex",
  width: "40vw",
  height: "40vh",
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGF0ZGV2IiwiYSI6ImNrYTJpb3c0eDAwM3MzZHBpOXhsZTI2bDIifQ.b5T5tOYhWSEj_gJ9gzIDeA";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-75.6972, 45.4215], // starting position
        zoom: 10, // starting zoom
      });

      let markers = [];

      // get current location
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
      map.on("load", async () => {
        setMap(map);
        map.resize();

        // create a HTML element for each feature
        const el = document.createElement("div");

        el.className = "marker";
        //

        let getParks = async (lat, lng, dist) => {
          const fetchParks = await fetch("http://localhost:5000/map");
          const geoJSON = await fetchParks.json();
          sortGeoJSON(geoJSON);

          markers.push(
            new mapboxgl.Marker()
              .setLngLat([
                geoJSON[2].geometry.coordinates[0],
                geoJSON[2].geometry.coordinates[1],
              ])
              .addTo(map)
          );
        };

        let backupGeoLocate = async () => {
          let res = await fetch("http://localhost:5000/geo");
          let data = await res.json();
          setPosition(data.latitude, data.longitude, 100);
        };

        let setPosition = (lat, lng, acc) => {
          map.setCenter([lng, lat]);
          //map.setZoom(zoom);
          markers.push(new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map));
          getParks();
        };

        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              console.log(pos);
              setPosition(
                pos.coords.latitude,
                pos.coords.longitude,
                pos.coords.accuracy
              );
            },
            (err) => {
              console.log(err);
              backupGeoLocate();
            }
          );
          //navigator.geolocation.clearWatch(locationWatch);
        } else {
          backupGeoLocate();
        }

        //
        // make a marker for each feature and add to the map
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  // from: https://www.geodatasource.com/developers/javascript

  return (
    <div>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
      <div></div>
    </div>
  );
};

export default MapboxGLMap;
