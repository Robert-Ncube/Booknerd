import React from "react";
import HomeBanner from "../components/home/HomeBanner";
import Topsellers from "../components/home/Topsellers";
import Recommened from "../components/home/Recommended";
import News from "../components/home/News";

const Home = () => {
  return (
    <div className="font-montserrat min-h-screen max-w-screen-2xl mx-auto px-4 py-6">
      <HomeBanner />
      <Topsellers />
      <Recommened />
      <News />
    </div>
  );
};

export default Home;
