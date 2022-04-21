import { React, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import useAxios from "axios-hooks";
import {
  getFavorites,
  setFavorites,
  removeFavorites,
} from "../../HelperFunctions/LocalStorage";
import "./favorites.scss";
import trashcan from "../../svg/trashcan.svg";

const Favorites = ({ searchresults, locationbool, setLat, setLon }) => {
  const [searchList, setSearchList] = useState(getFavorites() ?? []);
  const [stringdata, setStringData] = useState();

  const [{ data: placesdata, loading, error }, fetchFavoritePlacesData] =
    useAxios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${stringdata}.json?access_token=pk.eyJ1IjoiYXJvbjY0IiwiYSI6ImNsMWRiZW1hbDAwenkzaW1sZWJwZzFuaXEifQ.UiBcP8NENwG_jH_nzAH48w`,
      { manual: true }
    );

  useEffect(() => {
    if (stringdata) {
      fetchFavoritePlacesData();
      placesdata && setLon(placesdata?.features[0].center[0]);
      placesdata && setLat(placesdata?.features[0].center[1]);
    }
  }, [stringdata]);

  useEffect(() => {
    setSearchList(
      [...new Set(searchList).add(searchresults)].filter(
        (item) => item !== "Your Location's Data" && item !== ""
      )
    );
    setFavorites(searchList);
  }, [searchresults]);

  useEffect(() => {
    const favo = getFavorites();
    if (favo) {
      setSearchList(favo);
    }
  }, []);

  return (
    locationbool === "Favorites" && (
      <>
        <ul className="list">
          <h1>Favorites</h1>
          {searchList?.map((item) => (
            <li className="list-item" key={nanoid(5)}>
              <span
                className="list-item__span"
                onClick={() => {
                  setStringData(
                    searchList.filter((x) => x === item).toString()
                  );
                  console.log(searchList.filter((x) => x === item).toString());
                }}
              >
                {item}
              </span>
              <img
                className="list-item__trashcan"
                src={trashcan}
                alt="trashcan"
                onClick={() => {
                  setSearchList(searchList.filter((x) => x !== item));
                  setFavorites(searchList.filter((x) => x !== item));
                }}
              />
            </li>
          ))}
        </ul>
      </>
    )
  );
};

export default Favorites;
