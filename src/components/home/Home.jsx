import React from "react"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import PasarSindon from "./location/Location"
import Recomended from "./recomended/BestSelling"

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recomended />
      <Awards />
      <PasarSindon />
    </>
  )
}

export default Home
