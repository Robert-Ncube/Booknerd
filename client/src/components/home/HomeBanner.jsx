import React from "react";
import Banner from "../../assets/banner.png";
import Button from "../Button";

const HomeBanner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse my-5 gap-14 md:gap-8 items-center justify-between">
      <div className="flex items-center justify-center">
        <img src={Banner} alt="Home banner" className="" />
      </div>
      <div className="flex flex-col gap-8 md:gap-4 px-6  items-center md:items-start text-center md:text-start justify-center md:w-1/2">
        <h2 className="font-bold font-rubik text-2xl md:text-4xl w-fit">
          New Releases This Week!
        </h2>
        <p className="text-gray-600">
          Dive into the latest literary gems with our brand-new releases this
          week! From thrilling mysteries to heartwarming romances, there's
          something for every book lover. Don't miss out on the chance to
          discover your next favorite read. Our collection features a diverse
          range of genres, ensuring that you'll find a book that resonates with
          your taste. Embrace the adventure, get lost in the stories, and let
          the pages turn into your escape. Stay updated with our fresh picks and
          immerse yourself in the world of books like never before.
        </p>
        <Button
          title={"Subscribe"}
          styles={"bg-tprimary px-4 py-1 rounded-lg text-white"}
        />
      </div>
    </div>
  );
};

export default HomeBanner;
