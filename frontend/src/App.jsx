import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import store from "./store";

import ProtectedRoute from "./components/route/ProtectedRoute.jsx";

// * Body * //
import Home from "./components/Home.jsx";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";

// * User * //
import Login from "./components/user/Login.jsx";
import Register from "./components/user/Register.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import Profile from "./components/user/Profile.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import NewPassword from "./components/user/NewPassword.jsx";

// * Form * //
import Content from "./components/form/Content.jsx";
import Design from "./components/form/Design.jsx";
import Settings from "./components/form/Settings.jsx";

import { loadUser } from "./actions/userActions";

const App = () => {
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Form */}
        <Route path="/" element={<Content />} exact="true" />
        <Route path="/design" element={<Design />} exact="true" />
        <Route path="/settings" element={<Settings />} exact="true" />

        {/* <Route path="/" element={<Home />} exact="true" /> */}
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
          exact="true"
        />
        <Route
          path="/password/reset/:token"
          element={<NewPassword />}
          exact="true"
        />
      </Routes>
      {/* {!loading && (!isAuthenticated || user.role !== "Admin") && <Footer />} */}
      {/* <Footer /> */}
    </div>
  );
};

export default App;
