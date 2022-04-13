import React, { useState, useEffect } from "react";
import "./selectdays.scss";

const SelectDays = ({ setDays, days }) => {
  const [counter, setCounter] = useState();

  useEffect(() => {
    const json = JSON.stringify(days);
    localStorage.setItem("days", json);
  }, [days]);

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
            <div className="flexdaysbuttons">
              <button
                onClick={() => {
                  setCounter(1);
                }}
                className={`interfacebutton${days === 1 ? "--active" : ""}`}
              >
                1 Day
              </button>
              <button
                onClick={() => {
                  setCounter(2);
                }}
                className={`interfacebutton${days === 2 ? "--active" : ""}`}
              >
                2 Days
              </button>
              <button
                onClick={() => {
                  setCounter(3);
                }}
                className={`interfacebutton${days === 3 ? "--active" : ""}`}
              >
                3 Days
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default SelectDays;
