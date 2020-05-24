const fetch = require("node-fetch");

module.exports = () => {
  app.get("/search-parks", async (req, res) => {
    //build api URL with user zip
    const baseUrl =
      "https://maps.ottawa.ca/arcgis/rest/services/Parks_Inventory/MapServer/24/query?where=1%3D1&outFields=OBJECTID,LATITUDE,LONGITUDE,NAME,DOG_DESIGNATION,ADDRESS&outSR=4326&f=json";

    const apiUrl = userLocation(baseUrl);

    const response = await fetch(apiUrl);
    const json = await response.json();
    res.send({ json });
  });
};
