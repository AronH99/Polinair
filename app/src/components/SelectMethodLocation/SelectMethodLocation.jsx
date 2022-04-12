import { React, useState } from "react";
import "./selectmethodlocation.scss";

const SelectMethodLocation = ({
  setLocationbool,
  setSearchresults,
  toggleyourlocation,
  setToggleYourLocation,
}) => {
  const [methodbutton, setMethodbutton] = useState("Your Location");

  return (
    <>
      <div className="backgroundradiobutton">
        <form
          className="radiobuttonform"
          onSubmit={(e) => {
            e.preventDefault();
            setLocationbool(methodbutton === "Your Location");
          }}
        >
          <button
            value="Your Location"
            onClick={(e) => {
              setMethodbutton(e.target.value);
              setSearchresults("");
              setToggleYourLocation(!toggleyourlocation);
            }}
            className={`radiobutton${
              methodbutton === "Your Location" ? "__toggle" : ""
            }`}
          >
            Use Your Location
          </button>
          <button
            value="MapLocation"
            onClick={(e) => {
              setMethodbutton(e.target.value);
            }}
            className={`radiobutton${
              methodbutton === "MapLocation" ? "__toggle" : ""
            }`}
          >
            Use Map Location
          </button>
        </form>
      </div>
    </>
  );
};

export default SelectMethodLocation;
