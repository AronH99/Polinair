import { React, useState, useEffect } from "react";
import "./selectmethodlocation.scss";
import {
  getMethodButton,
  setLocalMethodButton,
  setLocalLocationBool,
} from "../../HelperFunctions/LocalStorage";

const SelectMethodLocation = ({
  setLocationbool,
  setSearchresults,
  toggleyourlocation,
  setToggleYourLocation,
  locationbool,
}) => {
  const [methodbutton, setMethodbutton] = useState(
    getMethodButton() || "Your Location"
  );
  useEffect(() => {
    setLocalMethodButton(methodbutton);
    setLocalLocationBool(locationbool);
  }, [methodbutton, locationbool]);

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
              methodbutton === "Your Location" ? "--active" : ""
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
              methodbutton === "MapLocation" ? "--active" : ""
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
