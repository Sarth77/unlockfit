import { useState, useContext } from "react";
import { RxAvatar } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navitage = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    let validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      email !== "" &&
      password !== "" &&
      validEmailRegex.test(email) &&
      password.length < 20 &&
      password.length > 5
    ) {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      try {
        if (email !== "admin@unlock.com") {
          setLoading(true);
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user });
          setLoading(false);
          toast.success("Logged In");
          setTimeout(() => {
            navitage("/");
          }, 4000);
        } else {
          alert("User does not exists");
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          setErrorMessage("Wrong Password");
          toast.error("Wrong Password");
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          setErrorMessage("User Not Found!!");
          toast.error("User Not Found!!");
        } else {
          setErrorMessage(error.message);
          toast.error(error.message);
        }
      }
    } else {
      alert("Please fill all details correctly");
    }
  };

  return (
    <div className="h-1/2 p-4 w-full flex justify-center items-center">
      <ToastContainer />
      <div className="flex justify-center items-center flex-col p-4 gap-4">
        <h2 className="text-5xl">Hello again!</h2>
        <h3 className="text-3xl">Nice to you.</h3>
        <div className="w-24 h-24 rounded">
          <RxAvatar className="w-24 h-24" />
        </div>
        <form className="gap-2 flex flex-col h-44 justify-center gap-8">
          <div className="flex flex-row justify-between gap-2">
            <label htmlFor="email" className="text-2xl">
              Email
            </label>
            <input
              id="email"
              name="email"
              type={"email"}
              className="border border-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between gap-2">
            <label className="text-2xl">Password</label>
            <input
              type="password"
              className="border border-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
        <button
          disabled={loading}
          type="submit"
          onClick={handleLogin}
          className="border border-1 bg-black text-white rounded w-20 h-8 flex justify-center items-center text-xl cursor-pointer hover:scale-105"
        >
          Login
        </button>
        {error && <div className="text-rose-600">{errorMessage}</div>}
        <div className="flex">
          Don't have account ?
          <NavLink
            to="/register"
            className="underline mx-1 decoration-sky-500 text-blue-600"
          >
            <h1 className="hover:scale-105">Register</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
