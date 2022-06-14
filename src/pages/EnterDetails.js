import React, { Fragment, useMemo } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { datasliceactions } from "../store/dataslice";
import "./Enterdetails.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function EnterDetails(props) {
  const dispatch = useDispatch();
  const [passengername, setpassengername] = useState("");
  const [passengerage, setpassengerage] = useState("");
  const [passengergender, setpassengergender] = useState("");
  const [passengerphoneno, setpassengerphoneno] = useState("");
  const [passengeremail, setpassengeremail] = useState("");
  const [totaltickets, settotaltickets] = useState(1);
 

  const increase = () => {
    if (totaltickets < 4) {
      settotaltickets(totaltickets + 1);
    }
  };

  const decrease = () => {
    if (totaltickets > 1) {
      settotaltickets(totaltickets - 1);
    }
  };

  

  const userdata = props.items.user;
  const busdata = props.items.busdata;

  const bookhandler = () => {
    console.log(passengerage);
    console.log(passengeremail)
    console.log(passengergender)
    console.log(passengerphoneno)
    console.log(passengername)
    if (
      passengername &&
      passengerage &&
      passengeremail &&
      passengergender &&
      passengerphoneno
    ) {
      const bookdata = {
        bookid: new Date().getTime().toString(),
        userid: userdata.id,
        name: passengername,
        age: passengerage,
        gender: passengergender,
        email: passengeremail,
        phoneno: passengerphoneno,
        totaltickets: totaltickets,
        ticketsprice: totaltickets * busdata.price,
        from: busdata.from,
        to: busdata.to,
        ondate: props.items3,
      };

      const existingbookings = JSON.parse(localStorage.getItem("bookingdata"));
      if (existingbookings) {
        localStorage.setItem(
          `bookingdata`,
          JSON.stringify([...existingbookings, bookdata])
        );
      } else {
        localStorage.setItem(`bookingdata`, JSON.stringify([bookdata]));
      }
      toast.success("Booking Success!!");
      dispatch(datasliceactions.openbookings());
    } else {
      toast.error("please Enter All Details");
    }
  };

  return (
    <Fragment>
      <div className="main-enterdetails">
        <div className="main-enterdetails-01">
          <div>
            <h2>Enter Passenger Details:</h2>
            <h3>Name</h3>
            <input
              className="form-control "
              placeholder="name"
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setpassengername(e.target.value);
              }}
            />
            <h3>Age</h3>
            <input
              placeholder="age"
              className="form-control "
              type="number"
              onChange={(e) => {
                e.preventDefault();
                setpassengerage(e.target.value);
              }}
            />
            <h3>Gender</h3>
            <select
              className="form-control "


              placeholder="gender"
              onChange={(e) => {
                e.preventDefault();
                setpassengergender(e.target.value);
              }}
            >
              <option>--Select Gender--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <h3>Phone No.</h3>
            <input
              className="form-control "

              type="number"
              placeholder="phone No."
              onChange={(e) => {
                e.preventDefault();
                setpassengerphoneno(e.target.value);
              }}
            />
            <h3>E-mail</h3>
            <input
              className="form-control "

              type="text"
              placeholder="E-mail"
              onBlur={(e) => {
                e.preventDefault();
                setpassengeremail(e.target.value);
              }}
            />
          </div>

          <div>
            <h3>Total Tickets Required</h3>
            <div className="count">
            <button className="btn btn-danger" onClick={decrease}>-</button>
            <input
              className="count_in "

              type="number"
              value={totaltickets}
              onChange={(e) => {
                settotaltickets(e.target.value);
              }}
            />
            <button className="btn btn-success" onClick={increase}>+</button>
            </div>
          </div>

          <div className="detail_btn">
            <button className="btn btn-danger mr3" onClick={props.items2}>Cancel</button>
            <button className="btn btn-success" onClick={bookhandler}>Book Now</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
