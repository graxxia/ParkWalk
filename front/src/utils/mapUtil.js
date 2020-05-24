export const distance = (lat1, lon1, lat2, lon2, unit) => {
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

/*
export const sortGeoJSON = () => {
  addDistance(geoJSON);
  const arr = Object.keys(geoJSON).forEach((key) => [key, geoJSON[key]]);
  console.log(arr);
  return arr;
};

const addDistance = async () => {
  let position = getLocation();
  console.log(await geoJSON);
  console.log((await geoJSON).json());
  await geoJSON.json().forEach(async (el) => {
    //
    let d = distance(
      position.lat,
      position.lng,

      el.geometry.coordinates[1],
      el.geometry.coordinates[0],
      "K"
    );

    //
    el.properties.distance = d;
  });
};

const getLocation = async () => {
  let res = await fetch("http://localhost:5000/geo");
  let data = await res.json();
  return data;
};
*/
