import React from "react";
import HomeBanner from "../components/home/HomeBanner";
import Topsellers from "../components/home/Topsellers";
import Recommened from "../components/home/Recommended";
import News from "../components/home/News";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="font-montserrat min-h-screen max-w-screen-2xl mx-auto px-4 py-6">
      <HomeBanner />
      <Topsellers />
      <Recommened />
      <div className="w-full flex items-center justify-center py-6">
        <Link
          to={"/books"}
          className="text-sm text-white bg-secondary hover:bg-secondary/60 py-2 px-4 rounded-lg"
        >
          View All Books
        </Link>
      </div>
      <News />
    </div>
  );
};

export default Home;
