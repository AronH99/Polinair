import React from "react";

const Form = ({ counter, setInput, setCounter, children }) => {
  return (
    <>
      <div className="flex">
        <section class="Form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setInput(counter);
              setCounter("");
            }}
          >
            <h2>Select Days</h2>
            <button
              onClick={() => {
                setInput("");
                setCounter(1);
              }}
            >
              1 Day
            </button>
            <button
              onClick={() => {
                setInput("");
                setCounter(2);
              }}
            >
              2 Days
            </button>
            <button
              onClick={() => {
                setInput("");
                setCounter(3);
              }}
            >
              3 Days
            </button>
          </form>
          {children}
        </section>
      </div>
    </>
  );
};

export default Form;
