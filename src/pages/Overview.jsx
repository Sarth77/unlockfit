import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import LineChart from "../components/LineChart";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Overview = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentUserData, setCurrentUserData] = useState();
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState("");
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
  }, [currentUser]);
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const docRef = doc(db, "users", currentUser?.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setCurrentUserData({ ...docSnap.data() });
  //     } else {
  //       console.log("No such document!");
  //     }
  //   };
  //   setLoading(false);
  //   return fetchdata;
  // }, [currentUser]);

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setWeight(e.target.value);
    }
  };
  const currentDate = new Date();
  // eslint-disable-next-line
  const [labelDate, setLabelDate] = useState(
    `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (currentUserData) {
      if (Number(weight) < 1999 && Number(weight) > 2) {
        await addDoc(collection(db, `table-${currentUser.uid}`), {
          date: labelDate,
          difference:
            weight -
            currentUserData.currentWeight[
              currentUserData.currentWeight.length - 1
            ],
          currentWeight: weight,
        });
        const changeRef = doc(db, "users", currentUser.uid);
        await updateDoc(changeRef, {
          change: arrayUnion(
            weight -
              currentUserData.currentWeight[
                currentUserData.currentWeight.length - 1
              ],
          ),
          currentWeight: arrayUnion(weight),
          goalRemaining: arrayUnion(currentUserData.weightGoal - weight),
        });
        const res = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(res);
        if (docSnap.exists()) {
          setCurrentUserData({ ...docSnap.data() });
          setLoading(false);
        } else {
          setLoading(false);
          toast.error("No such document!");
        }
        setOpen(false);
      } else {
        alert("Please enter valid weight");
      }
    }
  };
  return (
    <>
      {!loading && (
        <div className="w-full flex flex-col relative justify-center items-center">
          <ToastContainer />
          <div
            className={
              open
                ? "w-full flex flex-col justify-center items-center blur"
                : "w-full flex flex-col justify-center items-center"
            }
          >
            <div className="w-full flex flex-row">
              <div className="w-4/12 flex flex-col items-center">
                <h4>Start</h4>
                <div>
                  <span>
                    {currentUserData ? currentUserData.startWeight : ""}
                  </span>
                  <span>
                    {currentUserData ? currentUserData.weightUnit : ""}
                  </span>
                </div>
              </div>
              <div className="w-4/12 flex flex-col items-center">
                <h4>Current</h4>
                <div>
                  <span>
                    {currentUserData
                      ? currentUserData?.currentWeight[
                          currentUserData.currentWeight.length - 1
                        ]
                      : ""}
                  </span>
                  <span>{currentUserData?.weightUnit}</span>
                </div>
              </div>
              <div className="w-4/12 flex flex-col items-center">
                <h4>Target</h4>
                <div>
                  <span>{currentUserData?.weightGoal}</span>
                  <span>{currentUserData?.weightUnit}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 m-0.5">
              <div className="border-8 border-indigo-600"></div>
              <label>Weight</label>
              <div className="border-8 border-emerald-500"></div>
              <label>Average</label>
              <div className="border-8 border-red-500"></div>
              <label>Target</label>
            </div>
          </div>
          <div
            className={
              open
                ? "w-full flex items-center justify-center p-5 blur"
                : "w-full flex items-center justify-center p-5"
            }
          >
            <LineChart currentUserData={currentUserData} />
          </div>
          <div className="w-full flex flex-row mt-4 items-center mb-0">
            <div className="w-4/12 flex flex-col items-center">
              <h4>Change</h4>
              <div>
                <span>
                  {currentUserData
                    ? currentUserData?.change[currentUserData.change.length - 1]
                    : ""}
                </span>
                <span>{currentUserData?.weightUnit}</span>
              </div>
            </div>
            <div className="w-4/12 flex items-center justify-center text-center">
              <div
                className="rounded-full bg-blue-400 w-12 h-12 flex items-center justify-center text-white text-4xl text-center font-extralight hover:scale-110 cursor-pointer hover:bg-blue-500"
                onClick={() => setOpen(!open)}
              >
                <span className="items-center justify-center text-center flex">
                  +
                </span>
              </div>
            </div>
            <div className="w-4/12 flex flex-col items-center">
              <h4>Remaining</h4>
              <div>
                <span>
                  {currentUserData
                    ? currentUserData.goalRemaining[
                        currentUserData.goalRemaining.length - 1
                      ]
                    : ""}
                </span>
                <span>{currentUserData?.weightUnit}</span>
              </div>
            </div>
          </div>
          {open && (
            <div className="absolute w-full h-3/4 bg-gray-100 rounded md:w-1/2">
              <div className="flex flex-col rounded h-full">
                <div className="h-3/12 flex grow items-center justify-around gap-10">
                  <label className="w-1/2 flex justify-end text-lg">
                    Date :
                  </label>
                  <span className="w-1/2 text-lg">{labelDate}</span>
                </div>
                <div className="h-3/12 flex grow items-center justify-around gap-10">
                  <label className="w-1/2 flex justify-end text-lg">
                    Name :
                  </label>
                  <span className="w-1/2 text-lg">{currentUserData?.name}</span>
                </div>
                <div className="flex h-3/12 flex grow items-center justify-around gap-10">
                  <label className="w-1/2 flex justify-end text-lg">
                    Weight Recorded :
                  </label>
                  <div className="w-1/2">
                    <span className="mr-2">
                      <input
                        className="p-2"
                        placeholder="Weight"
                        type="Number"
                        value={weight}
                        onChange={handleChange}
                      />
                    </span>
                    <span className="text-basic">
                      {currentUserData?.weightUnit}
                    </span>
                  </div>
                </div>
                <div className="h-3/12 flex grow items-center justify-center">
                  <button
                    className="bg-green-400 rounded text-white text-xl p-2 hover:scale-105 hover:bg-green-500"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Overview;
