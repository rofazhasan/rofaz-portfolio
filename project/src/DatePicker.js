import React from 'react';

const DatePicker = ({ setDate }) => {
  return (
    <div>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
    </div>
  );
};

export default DatePicker;
