import React from "react";
import logo from "./unlockfit.jpeg";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Footer = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  let pathWindow = window.location.pathname;
  const [path, setpath] = useState(window.location.pathname);
  useEffect(() => {
    setpath(window.location.pathname);
  }, [pathWindow]);

  const handleDisplay = () => {
    navigate("/display", { replace: true });
  };

  const handleOverview = () => {
    navigate("/", { replace: true });
  };
  const handleHistory = () => {
    navigate("/history", { replace: true });
  };

  return (
    <>
      {currentUser ? (
        <div className="bottom-0 fixed bg-white py-5 w-full flex border-t border-gray-200 justify-center space-x-12">
          <div
            onClick={handleOverview}
            className={
              path === "/"
                ? "text-emerald-500 flex justify-center items-center flex-col"
                : "flex justify-center items-center flex-col cursor-pointer"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span>Overview</span>
          </div>
          <div
            onClick={handleDisplay}
            className={
              path === "/display"
                ? "text-emerald-500 flex justify-center items-center flex-col"
                : "flex justify-center items-center flex-col cursor-pointer"
            }
          >
            <svg
              className="w-6 h-6 feather feather-layers"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span>Statistics</span>
          </div>
          <div
            onClick={handleHistory}
            className={
              path === "/history"
                ? "text-emerald-500 flex justify-center items-center flex-col"
                : "flex justify-center items-center flex-col cursor-pointer"
            }
          >
            <svg
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              data-name="Layer 1"
              id="Layer_1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M478,256A222,222,0,0,1,99,413,220.55,220.55,0,0,1,34,256H63.92c0,105.91,86.17,192.08,192.08,192.08S448.08,361.91,448.08,256,361.91,63.92,256,63.92A191.8,191.8,0,0,0,116.58,124H175v29.92H70V49H99.93v49.3A221.93,221.93,0,0,1,478,256ZM250,139V280H373V250H280V139Z" />
            </svg>
            <span>History</span>
          </div>
        </div>
      ) : (
        <div className="bottom-0 w-full flex flex-row bg-black text-white p-2 justify-between">
          <div className="w-1/2 flex flex-col p-4 gap-2">
            <div className="w-44">
              <img src={logo} alt="" />
            </div>
            <div className="flex justify-center text-m">
              <p>
                Unlock.fit - Just a better place to control your weight. It
                assist you in weight control and helps you to lose weight or
                reach your weight goal. It has a BMI Calculator which calculates
                your BMI and your ideal weight through which you can acquire
                your target weight.
              </p>
            </div>
          </div>
          <div className="w-1/2 flex justify-start items-start flex-col text-m gap-1 px-12">
            <div>
              <div className="text-2xl">Features</div>
              <div>Track your weight</div>
              <div>Set your weight goal</div>
              <div>Calculate your BMI</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
