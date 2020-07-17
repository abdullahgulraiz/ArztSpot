import React from 'react';

const Alert = ({msg}) => {
  return (
    <div className="alert alert-danger">
      <i className="icofont-warning"/> {msg}
    </div>
  );
};

export default Alert;
