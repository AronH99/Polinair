import React, { useState, useEffect } from "react";
import { setLocalStorageData } from "../../Hooks/LocalStorage";
import "./selectdays.scss";

const SelectDays = ({ setDays, days }) => {
  useEffect(() => {
    setLocalStorageData("days", days);
  }, [days]);

  return (
    <>
      <div className="interfaceflex">
        <section className="Form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flexdaysbuttons">
              <button
                onClick={() => {
                  setDays(1);
                }}
                className={`interfacebutton${days === 1 ? "--active" : ""}`}
              >
                1 Day
              </button>
              <button
                onClick={() => {
                  setDays(2);
                }}
                className={`interfacebutton${days === 2 ? "--active" : ""}`}
              >
                2 Days
              </button>
              <button
                onClick={() => {
                  setDays(3);
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
