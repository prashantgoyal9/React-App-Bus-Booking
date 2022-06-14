import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import Showbuslist from "./Showbuslist";
import dataslice from "../store/dataslice";
import MyBookings from "./MyBookings";
import "./Home.css";
import { toast } from "react-toastify";

function Home() {
  const buslist = [
    {
      busid: 1,
      busname: "HYDERABAD SPECIAL",
      from: "Hyderabad",
      to: "Delhi",
      pickup: "06: 30 AM",
      droptime: "9:45 PM",
      seats: 25,
      price: 200,
    },
    {
      busid: 2,
      busname: "DELHI SPECIAL",
      from: "Delhi",
      to: "Hyderabad",
      pickup: "06: 00 AM",
      droptime: "7:30 PM",
      seats: 35,
      price: 400,
    },
    {
      busid: 3,
      busname: "RAJADHANI SPECIAL",
      from: "Hyderabad",
      to: "Delhi",
      pickup: "08: 00 AM",
      droptime: "6:20 PM",
      seats: 25,
      price: 600,
    },
    {
      busid: 4,
      busname: "RAJADHANI SPECIAL",
      from: "Delhi",
      to: "Hyderabad",
      pickup: "10: 00 AM",
      droptime: "4:20 PM",
      seats: 35,
      price: 800,
    },
  ];

  const today = new Date();
  const month01 = `${today.getMonth() + 1}`;
  const month = month01.padStart(`2`, 0);
  const date = today.getFullYear() + "-" + month + "-" + today.getDate();

  const user = useSelector((state) => state.dataslice.currentuser);
  const openbookings = useSelector((state) => state.dataslice.openbookings);

  const [fromcity, setfromcity] = useState();
  const [tocity, settocity] = useState();
  const [ondate, setondate] = useState(date);
  const [buseslist, setbuseslist] = useState();

  const searchHandler = () => {
    console.log(fromcity, tocity);

    if (
      fromcity == undefined ||
      fromcity == "none" ||
      tocity == "none" ||
      tocity == undefined
    ) {
      toast.error("Please Select From-city and To-City");
      return;
    }

    if (fromcity == tocity) {
      toast.error("From and Tocity Cannot be Same!!");
    }

    const buseslist = buslist.filter((elem) => {
      return elem.from === fromcity && elem.to === tocity;
    });

    setbuseslist(buseslist);
  };

  let data = {
    buseslist: buseslist,
    ondate: ondate,
    user: user,
  };

  return (
    <Fragment>
      <div className="home_container">
        <div className="sub_con">
          <h1> Welcome {user.username}</h1>

          <div className="sub_container">

            <div className="sub_c">
              <h3>From</h3>
              <select 
                className="form-control"
                id="cars"
                onChange={(e) => {
                  setfromcity(e.target.value);
                }}
              >
                <option value="none">-Select From-</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="sub_c">
              <h3>To</h3>
              <select
              className=" form-control form-select"
              // className="form-control"

                id="cars"
                onChange={(e) => {
                  e.preventDefault();
                  settocity(e.target.value);
                }}
              >
                <option value="none">-Select To-</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
          </div>
            <div className="sub_container">
              <div className="sub_c">
                <h3>On</h3>
                <input
                className="form-control"

                  type="date"
                  min={date}
                  defaultValue={date}
                  onChange={(e) => {
                    e.preventDefault();
                    setondate(e.target.value);
                  }}
                />
              </div>

            </div>
              <div>
                <button className="btn btn-primary" onClick={searchHandler}>Search</button>
              </div>
        </div>
      </div>

      <Showbuslist items={data} />
      {openbookings && <MyBookings />}
    </Fragment>
  );
}

export default Home;
