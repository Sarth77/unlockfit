/* eslint-disable react/forbid-prop-types */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import DisplayData from "./pages/Statistics";
import History from "./pages/History";
import ErrorPage from "./pages/ErrorPage.jsx";
import Layout from "./components/Layout";
import AuthRedirect from "./components/AuthRedirect.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Layout>
          <div className="overflow-scroll">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <AuthRedirect>
                    <Login />
                  </AuthRedirect>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthRedirect>
                    <SignUp />
                  </AuthRedirect>
                }
              />
              <Route
                path="/display"
                element={
                  <RequireAuth>
                    <DisplayData />
                  </RequireAuth>
                }
              />
              <Route
                path="/history"
                element={
                  <RequireAuth>
                    <History />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </Layout>
      </BrowserRouter>
    </div>
  );
}
export default App;
