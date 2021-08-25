import React from "react";
import { Link } from "react-router-dom";

const UseCard = (props) => {
  const { url, size, title, text, btnText } = props;

  return (
    <div className={`col-md-${size}`}>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{title}</h1>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default UseCard;
