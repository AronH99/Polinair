import "./choosepollen.scss";
import { React, useEffect } from "react";
import { setLocalStorageData } from "../../hooks/LocalStorage";

const ChoosePollen = ({ choosetype, setChooseType }) => {
  useEffect(() => {
    setLocalStorageData("choosetype", choosetype);
  }, [choosetype]);

  return (
    <div className="buttonselection">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <button
          value="tree"
          onClick={(e) => {
            setChooseType(e.target.value);
          }}
          className={`choosepol${choosetype === "tree" ? "--active" : ""}`}
        >
          Tree
        </button>
        <button
          value="grass"
          onClick={(e) => {
            setChooseType(e.target.value);
          }}
          className={`choosepol${choosetype === "grass" ? "--active" : ""}`}
        >
          Grass
        </button>
        <button
          value="weed"
          onClick={(e) => {
            setChooseType(e.target.value);
          }}
          className={`choosepol${choosetype === "weed" ? "--active" : ""}`}
        >
          Weed
        </button>
      </form>
    </div>
  );
};

export default ChoosePollen;
