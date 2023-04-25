import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DisplayData = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentUserData, setCurrentUserData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (currentUser) {
      const unuser = onSnapshot(
        doc(db, "users", currentUser?.uid),
        (snapShot) => {
          setCurrentUserData({ ...snapShot.data() });
          setLoading(false);
        },
        (error) => {
          toast.error(error.message);
        },
      );
      return () => {
        unuser();
      };
    }
    // eslint-disable-next-line
  }, [currentUser]);
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const docRef = doc(db, "users", currentUser.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setCurrentUserData({ ...docSnap.data() });
  //       setLoading(false);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   };
  //   return fetchdata;
  // }, [currentUser]);
  const progresslength = 0;
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="w-full flex flex-col relative justify-center items-center">
          <ToastContainer />
          <div className="w-full flex flex-col p-2">
            <h1 className="text-2xl px-2">Trends</h1>
            <div className="w-full border border-black"></div>
            <div className="flex flex-row justify-between px-2">
              <div>Change last 7 days</div>
              <div>
                {progresslength > 1 ? (
                  <>
                    <span>1.9</span>
                    <span className="px-1">
                      {currentUserData !== ""
                        ? currentUserData?.weightUnit
                        : ""}
                    </span>
                  </>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between px-2">
              <div>Change last 30 days</div>
              <div>
                {progresslength > 1 ? (
                  <>
                    <span>1.9</span>
                    <span className="px-1">{currentUserData?.weightUnit}</span>
                  </>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col p-2">
            <h1 className="text-2xl px-2">BMI</h1>
            <div className="w-full border border-black"></div>
            <div className="h-40 w-full flex flex-col items-center justify-center">
              <div
                className={
                  currentUserData?.bmiCategory[0] === "Normal"
                    ? `w-2/6 h-1/2 bg-emerald-500 border rounded`
                    : currentUserData?.bmiCategory[0] === "UnderWeight"
                    ? "w-2/6 h-1/2 bg-orange-600 border rounded"
                    : "w-2/6 h-1/2 bg-red-500 border rounded"
                }
              ></div>
              <div className="flex flex-row items-center gap-2 m-0.5 overflow-scroll w-full justify-center">
                <div className="border-8 border-orange-600"></div>
                <label>UnderWeight</label>
                <div className="border-8 border-emerald-500"></div>
                <label>Normal</label>
                <div className="border-8 border-red-500"></div>
                <label>OverWeight</label>
              </div>
            </div>
            <div className="flex flex-row justify-between px-2">
              <div>Category</div>
              <div>
                <span className="px-1 capitalize">
                  {currentUserData !== ""
                    ? currentUserData?.bmiCategory[0]
                    : ""}
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-between px-2">
              <div>Normal Weight</div>
              <div>
                {currentUserData?.weightUnit === "lbs" ? (
                  <span>132.07</span>
                ) : (
                  <span>59.9</span>
                )}
                <span>-</span>
                {currentUserData?.weightUnit === "lbs" ? (
                  <span>178.60</span>
                ) : (
                  <span>81</span>
                )}
                <span className="px-1">{currentUserData?.weightUnit}</span>
              </div>
            </div>
            <div className="flex flex-row justify-between px-2">
              <div>Difference</div>
              <div>
                <span>
                  {currentUserData !== ""
                    ? currentUserData?.staticDifference[0]
                    : ""}
                </span>
                <span className="px-1">{currentUserData?.weightUnit}</span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col p-2">
            <h1 className="text-2xl px-2">Progress</h1>
            <div className="w-full border border-black"></div>
            <div className="flex flex-row justify-between px-2">
              <div>Average change per week</div>
              <div>
                {progresslength > 1 ? (
                  <>
                    <span>1.9</span>
                    <span className="px-1">{currentUserData?.weightUnit}</span>
                  </>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between px-2">
              <div>Average change per month</div>
              <div>
                {progresslength > 1 ? (
                  <>
                    <span>1.9</span>
                    <span className="px-1">{currentUserData?.weightUnit}</span>
                  </>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayData;
