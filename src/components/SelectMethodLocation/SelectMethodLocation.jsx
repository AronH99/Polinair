import { React, useState, useEffect } from "react";
import "./selectmethodlocation.scss";
import {
  getMethodButton,
  setLocalMethodButton,
  setLocalLocationBool,
} from "../../HelperFunctions/LocalStorage";

const SelectMethodLocation = ({
  setLocationbool,
  toggleyourlocation,
  setToggleYourLocation,
  locationbool,
  setSearchresults,
}) => {
  const [methodbutton, setMethodbutton] = useState(
    getMethodButton() ?? "Your Location"
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
            if (methodbutton === "Your Location") {
              setLocationbool(true);
            } else if (methodbutton === "MapLocation") {
              setLocationbool(false);
            } else if (methodbutton === "Favorites") {
              setLocationbool("Favorites");
            }
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
          <button
            value="Favorites"
            onClick={(e) => {
              setMethodbutton(e.target.value);
            }}
            className={`radiobutton${
              methodbutton === "Favorites" ? "--active" : ""
            }`}
          >
            Favorites
          </button>
        </form>
      </div>
    </>
  );
};

export default SelectMethodLocation;
