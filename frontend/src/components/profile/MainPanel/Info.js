import React from 'react';

const Info = ({label, value}) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <label>{label}</label>
      </div>
      <div className="col-md-6">
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Info;
