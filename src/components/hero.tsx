import React from "react";
import banner from "../assets/banner.jpg";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="relative  bg-gray-50">
      <div className="container mx-auto px-4 pt-10 md:pt-20 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="text-gray-600 uppercase tracking-wider">
              Musician
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Hi There, I'm{" "}
              <span className="block text-[#4A2B2B]">Lainey Wilson</span>
            </h1>

            <p className="text-gray-600 text-lg max-w-lg">
              Welcome to my portfolio of captivating digital experiences.
              Explore my work and let&apos;s create something extraordinary together.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to={"/store"}
                className="bg-gray-900 text-white px-8 py-3 rounded hover:bg-gray-800"
              >
                My Store
              </Link>
              <Link
                to={"/contact"}
                className="border-2 border-gray-900 px-8 py-3 rounded hover:bg-gray-100"
              >
                Contact Me
              </Link>
            </div>
          </div>

          <div className="relative h-[20rem] md:h-[500px] block">
            <div className="relative w-full h-full overflow-hidden shadow-lg flex justify-center items-center animate-changingShape">
              <img
                src={banner}
                alt="Portrait photo"
                className="object-cover object-center w-full h-full"
              />
              <div className="absolute inset-0 border-8 border-black opacity-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
