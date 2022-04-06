import { React, useState } from "react";
import "./selectmethodlocation.scss";

const SelectMethodLocation = ({ setLocationbool, locationbool, setInput }) => {
  const [radiobutton, setRadiobutton] = useState();
  const handleChange = (e) => {
    const target = e.target;
    if (target.checked) {
      setRadiobutton(target.value);
      setLocationbool(radiobutton === "Your Location");
      setInput("");
    }
  };
  return (
    <>
      <div className="backgroundradiobutton">
        <form
          className="radiobuttonform"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="yourlocation">
            <input
              type="radio"
              id="yourlocation"
              name="Select Location"
              value="Your Location"
              checked={locationbool}
              onChange={handleChange}
            />
              Your Location
          </label>
          <label htmlFor="searchedlocation">
            <input
              type="radio"
              id="css"
              name="Select Location"
              value="Searched Location"
              checked={!locationbool}
              onChange={handleChange}
            />
              Searched Location
          </label>
        </form>
      </div>
    </>
  );
};

export default SelectMethodLocation;
