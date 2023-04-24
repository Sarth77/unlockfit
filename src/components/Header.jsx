import logo from "./unlockfit.jpeg";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign Out !");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    dispatch({ type: "LOGOUT" });
  };
  return (
    <nav className="p-5 fixed top-0 w-full flex justify-between items-center border-2 h-16 text-black bg-white z-50">
      <div className="w-28 cursor-pointer">
        <NavLink to="/">
          <img src={logo} alt="logo" className="object-cover" />
        </NavLink>
      </div>
      {currentUser ? (
        <div className="flex flex-row gap-2 items-center">
          <div>
            {currentUser?.photoURL === "" || currentUser?.photoURL === null ? (
              <FaRegUserCircle className="text-3xl" />
            ) : (
              <img
                className="h-[35px] w-[35px] rounded-full"
                alt="profile"
                src={currentUser?.photoURL}
              />
            )}
          </div>
          <button
            className="border border-1 bg-black text-white rounded w-20 h-8 flex justify-center items-center text-xl cursor-pointer hover:scale-105"
            onClick={logOut}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <ToastContainer />
          <button className="border border-1 bg-black text-white rounded w-20 h-8 flex justify-center items-center text-xl cursor-pointer hover:scale-105">
            <NavLink to="/login">Login</NavLink>
          </button>
          <button className="border border-1 bg-black text-white rounded w-20 h-8 flex justify-center items-center text-xl hover:scale-105">
            <NavLink to="/register">SignUp</NavLink>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
