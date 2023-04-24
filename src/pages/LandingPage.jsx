import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../components/unlockfit.jpeg";
const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4 mb-40">
      <div className="flex justify-center w-1/2 items-center">
        <img className="object-cover" src={logo} alt="center logo" />
      </div>
      <div className="text-3xl">Control your weight now !!</div>
      <div className="flex justify-center items-center w-1/2 text-xl">
        <p>
          Unlock.fit - Just a better place to control your weight. It assist you
          in weight control and helps you to lose weight or reach your weight
          goal. It has a BMI Calculator which calculates your BMI and your ideal
          weight through which you can acquire your target weight.
        </p>
      </div>
      <div className="flex justify-center items-center w-1/2 container text-2xl h-12">
        <button className="bg-black rounded p-2 text-white font-light">
          <NavLink to="/register">Register Now</NavLink>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
