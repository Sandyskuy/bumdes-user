import React from "react";
import Heading from "../../common/Heading";
import "./keunggulan.css";
import FeaturedCard from "./keunggulancard";

const Featured = () => {
  return (
    <>
      <section className="featured background">
        <div className="container">
          <Heading title="Keunggulan" />
          <FeaturedCard />
        </div>
      </section>
    </>
  );
};

export default Featured;
