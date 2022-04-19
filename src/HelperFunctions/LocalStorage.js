const GEOLAT = "geolat";
const GEOLON = "geolon";
const LAT = "lat";
const LON = "lon";
const PLACENAME = "placename";
const LOCATIONBOOL = "locationbool";
const DAYS = "days";
const METHODBUTTON = "methodbutton";
const CHOOSETYPE = "choosetype";

const getLocalStorageData = (string) => {
  return JSON.parse(localStorage.getItem(string));
};

const setLocalStorageData = (str, storedata) => {
  const json = JSON.stringify(storedata);
  localStorage.setItem(str, json);
};

//custom vanaf hier

const getChooseType = () => {
  return getLocalStorageData(CHOOSETYPE);
};

const setLocalChooseType = (data) => {
  setLocalStorageData(CHOOSETYPE, data);
};

const getDays = () => {
  return getLocalStorageData(DAYS);
};

const setLocalDays = (data) => {
  setLocalStorageData(DAYS, data);
};

const getMethodButton = () => {
  return getLocalStorageData(METHODBUTTON);
};

const setLocalMethodButton = (data) => {
  setLocalStorageData(METHODBUTTON, data);
};

const getLocationBool = () => {
  return getLocalStorageData(LOCATIONBOOL);
};

const setLocalLocationBool = (data) => {
  setLocalStorageData(LOCATIONBOOL, data);
};

const getPlaceName = () => {
  return getLocalStorageData(PLACENAME);
};

const setLocalPlaceName = (data) => {
  setLocalStorageData(PLACENAME, data);
};

const removePlaceName = () => {
  localStorage.removeItem(PLACENAME);
};

const getLatLon = () => {
  return [getLocalStorageData(LAT), getLocalStorageData(LON)];
};

const setLatLon = (lon, lat) => {
  setLocalStorageData(LON, lon);
  setLocalStorageData(LAT, lat);
};

const removeLatLon = () => {
  localStorage.removeItem(LON);
  localStorage.removeItem(LAT);
};

const getGeoLatGeoLon = () => {
  return [getLocalStorageData(GEOLAT), getLocalStorageData(GEOLON)];
};

const setGeoLatGeoLon = (geolon, geolat) => {
  setLocalStorageData(GEOLON, geolon);
  setLocalStorageData(GEOLAT, geolat);
};

const removeGeoLatGeoLon = () => {
  localStorage.removeItem(GEOLON);
  localStorage.removeItem(GEOLAT);
};

export {
  getChooseType,
  setLocalChooseType,
  getDays,
  setLocalDays,
  getMethodButton,
  setLocalMethodButton,
  getLocationBool,
  setLocalLocationBool,
  getPlaceName,
  setLocalPlaceName,
  removePlaceName,
  getLatLon,
  setLatLon,
  removeLatLon,
  getGeoLatGeoLon,
  setGeoLatGeoLon,
  removeGeoLatGeoLon,
};
