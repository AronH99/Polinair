import "./choosepollen.scss";
import { React } from "react";

const ChoosePollen = ({ choosetype, setChooseType }) => {
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
          className={`choosepol${choosetype === "tree" ? "__toggle" : ""}`}
        >
          Tree
        </button>
        <button
          value="grass"
          onClick={(e) => {
            setChooseType(e.target.value);
          }}
          className={`choosepol${choosetype === "grass" ? "__toggle" : ""}`}
        >
          Grass
        </button>
        <button
          value="weed"
          onClick={(e) => {
            setChooseType(e.target.value);
          }}
          className={`choosepol${choosetype === "weed" ? "__toggle" : ""}`}
        >
          Weed
        </button>
      </form>
    </div>
  );
};

export default ChoosePollen;
