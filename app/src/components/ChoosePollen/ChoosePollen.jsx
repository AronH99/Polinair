import "./choosepollen.scss";
import { React, useEffect } from "react";

const ChoosePollen = ({ choosetype, setChooseType }) => {
  useEffect(() => {
    const json = JSON.stringify(choosetype);
    localStorage.setItem("choosetype", json);
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
