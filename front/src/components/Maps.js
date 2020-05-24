import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { distance, geoJSON, sortGeoJSON } from "../utils/mapUtil";

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
      "pk.eyJ1IjoiZ3JheGlhIiwiYSI6ImNrYTJpeGNzNTA3ODQzZW1zMTdqeGZzanQifQ.xPivnMvLj87SfYnxR8Yf1Q";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-75.6972, 45.4215], // starting position
        zoom: 10, // starting zoom
      });

      let markers = [];
      let position = {};
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
          let closest = {
            lat: 0,
            lng: 0,
            distance: 100,
          };
          (await geoJSON).json.forEach((el) => {
            let d = distance(
              position.lat,
              position.lng,
              el.geometry.coordinates[1],
              el.geometry.coordinates[0],
              "K"
            );
            if (d < closest.distance) {
              closest = {
                lat: el.geometry.coordinates[1],
                lng: el.geometry.coordinates[0],
                distance: d,
              };
            }
          });

          console.log(closest);

          markers.push(
            new mapboxgl.Marker()
              .setLngLat([closest.lng, closest.lat])
              .addTo(map)
          );
        };

        let backupGeoLocate = async () => {
          let res = await fetch("http://localhost:5000/map/");
          let data = await res.json();
          setPosition(data.latitude, data.longitude, 100);
        };

        let setPosition = (lat, lng, acc) => {
          position = { lat: lat, lng: lng };
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
  sortGeoJSON();
  return (
    <div>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
      <div></div>
    </div>
  );
};

export default MapboxGLMap;
