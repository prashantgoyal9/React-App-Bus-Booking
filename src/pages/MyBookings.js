import React, { Fragment } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { datasliceactions } from "../store/dataslice";
import "./Mybookings.css";


export default function MyBookings() {  
  const dispatch = useDispatch();

  const user = useSelector((state) => state.dataslice.currentuser);
  const allbookings = JSON.parse(localStorage.getItem("bookingdata"));

  const cur_userbookings = allbookings?.filter((elem) => {
    return elem.userid == user.id;
  });

  return (
    <Fragment>
      <div className="main-main-mybooking">
      <div className="main-mybooking">
        <div>
          <div className="head">

          <h2>My Bookings</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(datasliceactions.closebookings());
            }}
          >
            X
          </button>
          </div>

          <div className="book_item">
            {cur_userbookings?.map((elem, i) => {
              return (
                <div key={i} className="main-mybooking-2">
                  <div>
                    <h3>From : {elem.from}</h3>
                    <h3> To: {elem.to}</h3>
                    <h3>on : {elem.ondate}</h3>
                    <h3> Total Price: {elem.ticketsprice}</h3>
                    <h3>
                      {" "}
                      This Ticket is Valid for {elem.totaltickets} Passengers
                    </h3>
                  </div>

                  <div>
                    <h2>Passenger Details:-</h2>
                    <h2>Name: {elem.name}</h2>
                    <h2>Age: {elem.age}</h2>
                    <h2>Gender: {elem.gender}</h2>
                    <h2>PhoneNo: {elem.phoneno}</h2>
                    <h2>Email: {elem.email}</h2>
                  </div>
                </div>
              );
            })}
            {cur_userbookings == undefined && <h1>No Bookings Found!!</h1>}
          </div>
        </div>
      </div>
      </div>  
    </Fragment>
  );
}
