import React, { Fragment, useMemo, useState } from "react";
import EnterDetails from "./EnterDetails";
import "./Showbuslists.css";

export default function Showbuslist(props) {
  let buslist = props.items.buseslist;
  let ondate = props.items.ondate;
  let user = props.items.user;

  const [busdata, setbusdata] = useState();
  const [bookdata, setbookdata] = useState();
  const [openbookingmodal, setbookingmodal] = useState(false);

  useMemo(() => {
    if (buslist !== "") {
      setbusdata(buslist);
    }
  }, [buslist]);

  const bookseathandler = (elem) => {
    let bookeddata = {
      user: user,
      busdata: elem,
    };

    setbookdata(bookeddata);
    setbookingmodal(true);
  };

  const closebookingmodal = () => {
    setbookingmodal(false);
  };

  return (
    <Fragment>
      {busdata !== "" && (
        <div>
          {busdata?.map((elem, i) => {
            return (
              <div key={i} className="bus-single">
                <div>
                  <h4>Pickup : {elem.pickup}</h4>
                  <h4>Droptime: {elem.droptime}</h4>
                </div>
                <div>
                  <h4>Bus Name: {elem.busname}</h4>
                  <h4>From : {elem.from}</h4>
                </div>
                <div>
                  <h4>To: {elem.to}</h4>
                  <h4>on: {ondate}</h4>
                </div>
                <div>
                  <h4>Price: {elem.price}</h4>
                  <h4>Seats: {elem.seats}</h4>
                </div>
                <button className="btn btn-primary showBtn" onClick={() => bookseathandler(elem)}>
                  Book Seats
                </button>
              </div>
            );
          })}
        </div>
      )}
      {openbookingmodal && (
        <EnterDetails
          items={bookdata}
          items2={closebookingmodal}
          items3={ondate}
        />
      )}
    </Fragment>
  );
}
