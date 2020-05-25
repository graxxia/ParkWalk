import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { sortGeoJSON } from "../utils/mapUtil";

const styles = {
  width: "100vw",
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
      let popups = [];

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
          console.log(geoJSON[0].properties);
          markers.push(
            new mapboxgl.Marker()
              .setLngLat([
                geoJSON[2].geometry.coordinates[0],
                geoJSON[2].geometry.coordinates[1],
              ])
              .addTo(map)
          );

          geoJSON.forEach((el) => {
            console.log(el.properties);
            const row = document.getElementById("cardRow");
            const divCard = document.createElement("div");
            divCard.className = "col s12 m6";
            divCard.innerHTML = `<div class="card blue-grey darken-1"> <div class="card-content white-text">
            <span class="card-title"> ${el.properties.name} </span> ${el.properties.PARK_TYPE} <br/> ${el.properties.distance} </div> </div>`;
            divCard.addEventListener("click", (ev) => {
              for (let i = 0; i < markers.length - 1; ++i) {
                markers[i + 1].remove();
              }

              popups.push(
                new mapboxgl.Popup({ closeOnClick: true })
                  .setLngLat([
                    el.geometry.coordinates[0],
                    el.geometry.coordinates[1],
                  ])
                  .setHTML(`<p> ${el.properties.name}</p>`)
                  .addTo(map)
              );

              markers.push(
                new mapboxgl.Marker()
                  .setLngLat([
                    el.geometry.coordinates[0],
                    el.geometry.coordinates[1],
                  ])
                  .addTo(map)
              );
            });
            row.appendChild(divCard);
          });
        };

        let backupGeoLocate = async () => {
          let res = await fetch("http://localhost:5000/geo");
          let data = await res.json();
          setPosition(data.latitude, data.longitude, 100);
        };

        let setPosition = async (lat, lng, acc) => {
          map.setCenter([lng, lat]);
          //map.setZoom(zoom);
          markers.push(new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map));
          popups.push(
            new mapboxgl.Popup({ closeOnClick: true })
              .setLngLat([lng, lat])
              .setHTML(`<p>You!</p>`)
              .addTo(map)
          );
          await getParks();
        };

        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
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
