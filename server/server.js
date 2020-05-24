const util = require("./utils/util");
const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());

app.get("/geo/", async (req, res) => {
  util.currentLocation(req, res);
});

app.get("/map/", async (req, res) => {
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

app.get("/parksOttawa", (req, res) => {
  let parksOttawa = [
    {
      id: 1,
      title: "Major's Hill Park",
      link: "https://ncc-ccn.gc.ca/places/majors-hill-park",
      description:
        "Major's Hill Park is a park in downtown Ottawa, Ontario. The park stands above the Rideau Canal at the point where it enters the Ottawa River.",
    },
    {
      id: 2,
      title: "Jacques Cartier Park",
      link: "https://ncc-ccn.gc.ca/places/jacques-cartier-park",
      description:
        "Jacques-Cartier Park is a park in Gatineau, Quebec, Canada, along the Ottawa River. It is at the base of the Alexandra Bridge, facing the National Gallery of Canada in Ottawa. It is named for French explorer Jacques Cartier, who arrived at the mouth of the Ottawa River while he was looking for the Northwest Passage.",
    },
    {
      id: 3,
      title: "Strathcona Park",
      link: "https://ottawa.ca/en/recreation-and-parks/parks-and-green-space",
      description:
        "Strathcona Park is a large park in Ottawa, Ontario, Canada. It lies on the west bank of the Rideau River and marks the eastern edge of the Sandy Hill neighbourhood. The area of the park was originally the swampy floodplain of the river, and was impossible to build on. ",
    },
    {
      id: 4,
      title: "Confederation Park",
      link: "https://ncc-ccn.gc.ca/places/confederation-park",
      description:
        "Confederation Park is a public park and National Historic Site of Canada, located in downtown Ottawa, Ontario, Canada.",
    },
  ];

  res.json(parksOttawa);
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
