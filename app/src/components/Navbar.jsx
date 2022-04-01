import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <section class="Navbar">
        <h1>
          AirQuality
          <img src="./src/svg/pollen.svg" alt="SpringFlower" />
        </h1>
        {/*  <li>
          <Link to="/">Body</Link>
        </li>
        <li>
          <Link to="/Test">Test</Link>
        </li> */}
      </section>
    </>
  );
};

export default Navbar;
