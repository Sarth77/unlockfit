import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { IoPersonOutline } from "react-icons/io5";
import {
  MdOutlineAlternateEmail,
  MdLockOutline,
  MdOutlineLockClock,
} from "react-icons/md";
import { storage } from "../firebase";
import WebSignUp from "./WebSignUp";
import { toast, ToastContainer } from "react-toastify";
import { FaRegUserCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const currentDate = new Date();
  // eslint-disable-next-line
  const [labelDate, setLabelDate] = useState(
    `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`,
  );
  const [signUpData, setSignUpData] = useState({
    userweightsUnit: "lbs",
    userheightsUnit: "cm",
    currentWeight: "",
    userweightGoal: "",
    userHeight: "",
    email: "",
    gender: "male",
    password: "",
    confirmPassword: "",
    username: "",
    age: "",
    picture: "",
    height: 0,
    mass: 0,
    staticDifference: 0,
    bmicategory: "",
    goalRemaining: 0,
    bmi: 0,
  });
  const [file, setFile] = useState(null);
  const [per, setPerc] = useState(null);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              toast.error("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setSignUpData((prev) => ({ ...prev, picture: downloadURL }));
          });
        },
      );
    };
    file && uploadFile();
  }, [file]);
  const handleInput = (e) => {
    const id = e.target.name;
    const value = e.target.value;
    setSignUpData((prev) => ({ ...prev, [id]: value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");
    let reg = new RegExp(/^\d{0,9}$/);
    if (checked) {
      if (
        signUpData.password !== "" &&
        signUpData.password === signUpData.confirmPassword &&
        signUpData.email !== "" &&
        signUpData.username !== "" &&
        signUpData.age !== "" &&
        signUpData.age > 5 &&
        signUpData.age < 150 &&
        reg.test(signUpData.age) &&
        signUpData.currentWeight !== "" &&
        signUpData.currentWeight > 5 &&
        signUpData.userHeight !== "" &&
        reg.test(signUpData.userHeight) &&
        signUpData.userHeight > 2 &&
        signUpData.userweightGoal !== "" &&
        signUpData.userweightGoal > 5 &&
        signUpData.userheightsUnit !== "" &&
        signUpData.userweightsUnit !== "" &&
        signUpData.gender !== "" &&
        reg.test(signUpData.currentWeight) &&
        reg.test(signUpData.userweightGoal)
      ) {
        try {
          if (signUpData.userweightsUnit === "lbs") {
            setSignUpData({
              mass: Number((signUpData.currentWeight / 2.205).toFixed(2)),
            });
            if (signUpData.userheightsUnit === "cm") {
              setSignUpData({
                height: Number((signUpData.userHeight / 100).toFixed(2)),
              });
            } else {
              setSignUpData({
                height: Number(signUpData.userHeight).toFixed(2),
              });
            }
            setSignUpData({
              bmi: Number(
                (
                  Number(signUpData.mass) /
                  (Number(signUpData.height) * Number(signUpData.height))
                ).toFixed(2),
              ),
            });
            if (parseFloat(signUpData.bmi) < parseFloat(18.5)) {
              setSignUpData({ bmicategory: "UnderWeight" });
              setSignUpData({
                staticDifference: Number(
                  (signUpData.currentWeight - 132.07).toFixed(2),
                ).toFixed(2),
              });
            } else if (
              parseFloat(18.5) < parseFloat(signUpData.bmi) &&
              parseFloat(signUpData.bmi) < parseFloat(25)
            ) {
              setSignUpData({ bmicategory: "Normal" });
              setSignUpData({ staticDifference: 0 });
            } else if (parseFloat(signUpData.bmi) > parseFloat(25)) {
              setSignUpData({ bmicategory: "OverWeight" });
              setSignUpData({
                staticDifference: Number(
                  (Number(signUpData.currentWeight) - 178.6).toFixed(2),
                ).toFixed(2),
              });
            }
          } else if (signUpData.userweightsUnit === "kg") {
            setSignUpData({
              mass: Number(Number(signUpData.currentWeight).toFixed(2)),
            });
            if (signUpData.userheightsUnit === "cm") {
              setSignUpData({
                height: Number((signUpData.userHeight / 100).toFixed(2)),
              });
            } else {
              setSignUpData({
                height: Number(Number(signUpData.userHeight).toFixed(2)),
              });
            }
            setSignUpData({
              bmi: Number(
                (
                  Number(signUpData.mass) /
                  (Number(signUpData.height) * Number(signUpData.height))
                ).toFixed(2),
              ),
            });
            if (parseFloat(signUpData.bmi) < parseFloat(18)) {
              console.log("inside if of BMI UnderWeight");
              setSignUpData({ bmicategory: "UnderWeight" });
              setSignUpData({
                staticDifference: Number(
                  (signUpData.currentWeight - parseFloat(59.9)).toFixed(2),
                ).toFixed(2),
              });
            } else if (
              parseFloat(18) < parseFloat(signUpData.bmi) &&
              parseFloat(signUpData.bmi) < parseFloat(25)
            ) {
              console.log("inside else if of BMI Normal");
              setSignUpData({ bmicategory: "Normal" });
              setSignUpData({ staticDifference: 0 });
            } else if (parseFloat(signUpData.bmi) > parseFloat(25)) {
              console.log("inside else of BMI OverWeight");
              setSignUpData({ bmicategory: "OverWeight" });
              setSignUpData({
                staticDifference: Number(
                  (signUpData.currentWeight - parseFloat(81)).toFixed(2),
                ).toFixed(2),
              });
            }
          }

          const res = await createUserWithEmailAndPassword(
            auth,
            signUpData.email,
            signUpData.password,
          );
          const user = res.user;

          await updateProfile(user, {
            displayName: signUpData.username,
          });
          console.log("bmi", signUpData.bmi);
          console.log("bmicategory", signUpData.bmicategory);

          const dbRef = collection(db, "users");
          await setDoc(doc(dbRef, user.uid), {
            bmi: [Number(signUpData.bmi)],
            bmiCategory: [signUpData.bmicategory],
            startDate: labelDate,
            picture: signUpData.picture,
            email: signUpData.email,
            name: signUpData.username,
            gender: signUpData.gender,
            age: Number(signUpData.age),
            startWeight: Number(signUpData.currentWeight),
            currentWeight: [Number(signUpData.currentWeight)],
            weightGoal: Number(signUpData.userweightGoal),
            height: [Number(signUpData.userHeight)],
            weightUnit: signUpData.userweightsUnit,
            heightUnit: signUpData.userheightsUnit,
            progress: [],
            staticDifference: [Number(signUpData.staticDifference)],
            change: [Number(signUpData.change)],
            goalRemaining: [Number(signUpData.goalRemaining)],
            role: "U",
          });

          await addDoc(collection(db, `table-${res.user.uid}`), {
            date: labelDate,
            currentWeight: signUpData.currentWeight,
            difference: 0,
          });
          toast.success("Account created !");
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } catch (err) {
          setError(true);
          if (err.message === "Firebase: Error (auth/email-already-in-use).") {
            setErrorMessage("Email already in use!!");
            toast.error("Email already in use!");
          } else if (
            err.message ===
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            setErrorMessage("Password should have 6 characters!!");
            toast.error("Password should have 6 characters!");
          } else if (err.message === "Firebase: Error (auth/invalid-email).") {
            setErrorMessage("Invalid Email !!");
            toast.error("Invalid Email !");
          } else {
            setErrorMessage("Error Please try again later !");
            toast.error(err.message);
          }
        }
      } else {
        alert("Please fill all details correctly");
      }
    } else {
      alert("Please agree to the Terms & Conditions");
    }
  };
  return (
    <div>
      <div className="hidden md:block">
        <WebSignUp />
      </div>
      <div className="md:hidden p-4 w-full flex items-center justify-center flex-col bg-[#f2f4f8] gap-4">
        <ToastContainer />
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
          <div className="flex h-[50px] w-full items-center justify-center">
            {signUpData.picture === "" ? (
              <div>
                <label htmlFor="file" className="cursor-pointer">
                  <FaRegUserCircle className="text-4xl" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            ) : (
              <div>
                <img
                  className="h-[60px] w-[60px] rounded"
                  alt=""
                  src={signUpData?.picture}
                />
              </div>
            )}
          </div>
          <div className="flex w-full h-[50px] bg-[#fff] items-center border border-1 border-slate-100 px-2 rounded-full cursor-pointer">
            <input
              name="username"
              type="text"
              onChange={handleInput}
              placeholder="Enter name"
              className="border-none outline-none w-full h-full bg-[#fff] text-base font-medium rounded-full px-4"
            />
            <IoPersonOutline className="text-2xl font-medium" />
          </div>

          <div className="flex w-full h-[50px] bg-[#fff] items-center border border-1 border-slate-100 px-2 rounded-full cursor-pointer">
            <input
              name="email"
              type="email"
              onChange={handleInput}
              placeholder="Enter email"
              className="border-none outline-none w-full h-full bg-[#fff] text-base font-medium rounded-full px-4"
            />
            <MdOutlineAlternateEmail className="text-2xl font-medium" />
          </div>

          <div className="flex w-full h-[50px] bg-[#fff] items-center border border-1 border-slate-100 px-2 rounded-full cursor-pointer">
            <input
              name="password"
              type="password"
              onChange={handleInput}
              placeholder="Enter password"
              className="border-none outline-none w-full h-full bg-[#fff] text-base font-medium rounded-full px-4"
            />
            <MdLockOutline className="text-2xl font-medium" />
          </div>

          <div className="flex w-full h-[50px] bg-[#fff] items-center border border-1 border-slate-100 px-2 rounded-full cursor-pointer">
            <input
              name="confirmPassword"
              type="password"
              onChange={handleInput}
              placeholder="Confirm password"
              className="border-none outline-none w-full h-full bg-[#fff] text-base font-medium rounded-full px-4"
            />
            <MdOutlineLockClock className="text-2xl font-medium" />
          </div>
          <div className="flex w-full h-[50px] bg-[#fff] items-center border border-1 border-slate-100 px-2 rounded-full cursor-pointer">
            <input
              name="userHeight"
              type="Number"
              onChange={handleInput}
              placeholder="Height"
              className="border-none outline-none w-full h-full bg-[#fff] text-base font-medium rounded-full px-4"
            />
            <select
              name="userheightsUnit"
              onChange={handleInput}
              className="border-none outline-none"
            >
              <option value="cm">cm</option>
              <option value="m">m</option>
            </select>
          </div>
          <div className="flex w-full h-[50px] bg-[#fff] items-center border border-1 border-slate-100 px-2 rounded-full cursor-pointer">
            <input
              name="currentWeight"
              type="Number"
              onChange={handleInput}
              placeholder="Current Weight"
              className="border-none outline-none w-full h-full bg-[#fff] text-base font-medium rounded-full px-4"
            />
            <select
              name="userweightsUnit"
              onChange={handleInput}
              className="border-none outline-none"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>
          <div className="flex w-full h-[50px] bg-[#fff] items-center border border-1 border-slate-100 px-2 rounded-full cursor-pointer">
            <input
              name="userweightGoal"
              type="Number"
              onChange={handleInput}
              placeholder="Weight Goal"
              className="border-none outline-none w-full h-full bg-[#fff] text-base font-medium rounded-full px-4"
            />
          </div>
          <div className="flex w-full h-[50px] bg-[#fff] items-center border border-1 border-slate-100 px-2 rounded-full cursor-pointer">
            <input
              name="age"
              type="Number"
              onChange={handleInput}
              placeholder="Age"
              className="border-none outline-none w-full h-full bg-[#fff] text-base font-medium rounded-full px-4"
            />
            <select
              name="gender"
              onChange={handleInput}
              className="border-none outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <label className="flex gap-2 ml-2 items-center">
            <input
              name="checkbox"
              type="checkbox"
              value={checked}
              onChange={() => setChecked(!checked)}
            />
            <span className="text-xl font-light text-slate-600">
              I agree to the Terms & Conditions
            </span>
          </label>

          <div className="flex flex-col jusitfy-center items-center w-full border border-1 rounded">
            <button
              disabled={per !== null && per < 100}
              className="bg-[#00ff84] text-[#002333] text-xl w-full font-medium py-3 rounded hover:bg-[#002333] hover:text-white cursor-pointer"
              type="submit"
            >
              Submit now
            </button>
          </div>
          {error && <div className="text-rose-600">{errorMessage}</div>}
          <div className="flex text-slate-600 text-lg px-2 items-center">
            Already have an account?
            <NavLink
              to="/login"
              className="underline mx-1 decoration-sky-500 text-blue-600"
            >
              <h1 className="hover:scale-105">Login</h1>
            </NavLink>
            instead.
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
