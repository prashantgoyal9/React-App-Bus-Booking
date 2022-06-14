import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Fragment } from "react";
import Header from "./pages/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import init from "./init";
import MyBookings from "./pages/MyBookings";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const loggedin = useSelector((state) => state.dataslice.loggedin);
  return (
    <Fragment>
      <Header />
      {!loggedin && (
        <>
          <Routes>
            <Route element={<Login />} path="/"></Route>
            <Route element={<Register />} path="/Register"></Route>
            </Routes>
            </>
            )}
      {loggedin && <Home />}
<ToastContainer
position="top-right"
autoClose={1800}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </Fragment>
  );
}

export default App;
