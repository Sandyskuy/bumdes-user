import React from "react";
import Berita from "./berita/berita";
import Featured from "./keunggulan/keunggulan";
import Hero from "./hero/Hero";
import PasarSindon from "./pasarsindon/Location";
import Recomended from "./recomended/BestSelling";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recomended />
      <Berita />
      <PasarSindon />
    </>
  );
};

export default Home;
