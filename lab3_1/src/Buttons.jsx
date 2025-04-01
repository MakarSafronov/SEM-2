import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';


const Buttons = ({ count = 5 }) => {
  const [counters, setCounters] = useState(Array(count).fill(0));
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  const handleClick = (index) => {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
    setLastClickedIndex(index);
  };

  return (
    <div className="d-flex align-items-start">
      {counters.map((counter, index) => (
        <button
          key={index}
          className={`btn ${lastClickedIndex === index ? 'btn-success' : 'btn-primary'} mb-2`}
          onClick={() => handleClick(index)}
        >
          {counter}
        </button>
      ))}
    </div>
  );
};

export default Buttons;