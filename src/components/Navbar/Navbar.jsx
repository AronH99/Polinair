import React from "react";
import "./navbar.scss";
import pollen from "../../svg/pollen.svg";

const Navbar = () => {
  return (
    <>
      <section className="Navbar">
        <h1>
          Polinair
          <img src={pollen} alt="" />
        </h1>
      </section>
    </>
  );
};

export default Navbar;
