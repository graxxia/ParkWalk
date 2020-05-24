import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
        var el = document.createElement("div");
        el.className = "marker";
        //
        let markers = [];
        let position = {};
        let getParks = async (lat, lng, dist) => {
          let res = await fetch("http://localhost:5000/parks");
          let geoJSON = await res.json();

          let closest = { lat: 0, lng: 0, distance: 100 };
          geoJSON.forEach((el) => {
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
          console.log("Backup oops");
          let res = await fetch("http://localhost:5000/geo");
          let data = await res.json();
          setPosition(data.latitude, data.longitude, 100);
        };
        let setPosition = (lat, lng, acc) => {
          position = { lat: lat, lng: lng };
          //map.setCenter([lng, lat]);
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
        // from: https://www.geodatasource.com/developers/javascript
        let distance = (lat1, lon1, lat2, lon2, unit) => {
          if (lat1 === lat2 && lon1 === lon2) {
            return 0;
          } else {
            var radlat1 = (Math.PI * lat1) / 180;
            var radlat2 = (Math.PI * lat2) / 180;
            var theta = lon1 - lon2;
            var radtheta = (Math.PI * theta) / 180;
            var dist =
              Math.sin(radlat1) * Math.sin(radlat2) +
              Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
              dist = 1;
            }
            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === "K") {
              dist = dist * 1.609344;
            }
            if (unit === "N") {
              dist = dist * 0.8684;
            }
            return dist;
          }
        };
        //
        // make a marker for each feature and add to the map
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
