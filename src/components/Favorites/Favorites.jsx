import { React, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import {
  getFavorites,
  setFavorites,
  removeFavorites,
} from "../../HelperFunctions/LocalStorage";
import "./favorites.scss";

const Favorites = ({ searchresults }) => {
  const [searchList, setSearchList] = useState(getFavorites() ?? []);

  useEffect(() => {
    setSearchList(
      [...new Set(searchList).add(searchresults)].filter(
        (item) => item !== "Your Location's Data"
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
    <>
      <ul className="list">
        {searchList.map((item) => (
          <li className="list-item" key={nanoid(5)}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Favorites;
