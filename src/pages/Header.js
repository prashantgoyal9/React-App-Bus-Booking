import React, { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { datasliceactions } from "./../store/dataslice";
import MyBookings from "./MyBookings";
import "./Header.css";
import { toast } from "react-toastify";

function Header() {
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.dataslice.loggedin);

  const openbookinghandler = (e) => {
    e.preventDefault();
    dispatch(datasliceactions.openbookings());
  };

  return (
    <Fragment>
      <nav className="navbar navbar-light bg-dark mb-5">
        <div className="container-fluid ">
          <div className="navbar-brand text-md text-light ">Holidays Tours & Travels</div>
          <form className="d-flex">
            {!loggedin && <Link className="btn text-light" to={"/"}>Login</Link>}
            {!loggedin && <Link className="btn text-light" to={"/Register"}>Sign up</Link>}
            {loggedin && <button className="btn text-light" onClick={openbookinghandler}>My Bookings</button>}
            {loggedin && <Link  to={"/"} onClick={(e) => {
              e.preventDefault();
              toast.info("Logout Success!!")
              dispatch(datasliceactions.logout());
            }} className="btn text-light ">Logout</Link>}
          </form>
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
