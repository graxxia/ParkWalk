const util = require("./utils/util");
const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;

app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());

app.get("/geo/", async (req, res) => {
  util.currentLocation(req, res);
});

app.get("/parks/", async (req, res) => {
  let park = await axios.get(
    "https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/24/query?where=1%3D1&outFields=NAME,PARK_TYPE,LATITUDE,LONGITUDE&returnGeometry=false&returnDistinctValues=true&outSR=4326&f=json"
  );

  res.contentType("json");

  const initJSON = park.data.features;
  const geoJSON = [];
  initJSON.forEach((geo, index) => {
    let geometry = {};
    let geoFragment = {};
    let properties = {};
    geoFragment.type = "Feature";
    geometry.type = "Point";
    geometry.coordinates = [geo.attributes.LONGITUDE, geo.attributes.LATITUDE];
    geoFragment.geometry = geometry;
    properties.name = geo.attributes.NAME;
    properties.PARK_TYPE = geo.attributes.PARK_TYPE;
    geoFragment.properties = properties;

    geoJSON.push(geoFragment);
  });
  var uniq = [...new Set(geoJSON)];
  res.send(uniq);
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
