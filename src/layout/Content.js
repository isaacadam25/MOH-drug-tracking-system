import React from "react";

const Content = (props) => {
  const { children, title } = props;

  return (
    <div className="col-md-12 p-2">
      <div className="row">
        <div className="col-md-12">
          <h6 className="h6 p-1" style={{ fontSize: 25 }}>
            <i className="fa fa-th" /> {title}
          </h6>
        </div>
      </div>
      <hr />
      <div className="row justify-content-center">
        <div className="col-md-12">{children}</div>
      </div>
    </div>
  );
};

export default Content;
