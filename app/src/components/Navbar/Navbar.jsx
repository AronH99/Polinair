import React from "react";
import "./navbar.scss";

const Navbar = () => {
  return (
    <>
      <section className="Navbar">
        <h1>
          AirQuality
          <img src="./src/svg/pollen.svg" alt="SpringFlower" />
        </h1>
      </section>
    </>
  );
};

export default Navbar;