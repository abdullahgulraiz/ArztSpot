import React, {Fragment} from "react";
const Loading = () => {
  return (
    <Fragment>
      <div className="spinner-border text-primary" style={{"width": "3rem", "height": "3rem"}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Fragment>
  );
};

export default Loading;
