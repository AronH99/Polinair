import React, { useState } from "react";
import "./selectdays.scss";

const SelectDays = ({ setDays, children }) => {
  const [counter, setCounter] = useState();
  return (
    <>
      <div className="interfaceflex">
        <section className="Form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDays(counter);
            }}
          >
            <h2>Select Days</h2>
            <div className="flexdaysbuttons">
              <button
                onClick={() => {
                  setCounter(1);
                }}
                className={`interfacebutton${counter === 1 ? "__toggle" : ""}`}
              >
                1 Day
              </button>
              <button
                onClick={() => {
                  setCounter(2);
                }}
                className={`interfacebutton${counter === 2 ? "__toggle" : ""}`}
              >
                2 Days
              </button>
              <button
                onClick={() => {
                  setCounter(3);
                }}
                className={`interfacebutton${counter === 3 ? "__toggle" : ""}`}
              >
                3 Days
              </button>
            </div>
          </form>
          {children}
        </section>
      </div>
    </>
  );
};

export default SelectDays;