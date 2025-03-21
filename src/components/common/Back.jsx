import React from "react";
import "./Back.css";

const Back = ({ name, title, cover }) => {
  return (
    <>
      <div className="back">
        <div className="container-back">
          <span>{name}</span>
          <h1>{title}</h1>
        </div>
        <img src={cover} alt="" />
      </div>
    </>
  );
};

export default Back;
