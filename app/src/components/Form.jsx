import React from "react";

const Form = ({ counter, setInput, setCounter }) => {
  return (
    <>
      <section class="Form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInput(counter);
            setCounter("");
          }}
        >
          <h2>Dagen</h2>
          <button
            onClick={() => {
              setCounter(1);
            }}
          >
            1 Day
          </button>
          <button
            onClick={() => {
              setCounter(2);
            }}
          >
            2 Days
          </button>
          <button
            onClick={() => {
              setCounter(3);
            }}
          >
            3 Days
          </button>
        </form>
      </section>
    </>
  );
};

export default Form;
