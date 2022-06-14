import React, { Fragment, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpasswrod] = useState();
  const [phoneno, setphoneno] = useState();

  const handleSubmit = (e) => {
    const prevuserdata = JSON.parse(localStorage.getItem("users"));

    const data = prevuserdata?.filter((elem) => {
      return elem.username == username;
    });

    if (data.length !== 0) {
      toast.error("username Already Exist");
      return;
    }

    e.preventDefault();
    let storedusers = JSON.parse(localStorage.getItem(`users`));

    let userdata = {
      id: new Date().getTime().toString(),
      username: username,
      email: email,
      password: password,
      phoneno: phoneno,
    };

    if (username && email && password && phoneno && email.includes("@")) {
      if (storedusers == null) {
        localStorage.setItem(`users`, JSON.stringify([userdata]));
      } else {
        localStorage.setItem(
          `users`,
          JSON.stringify([...storedusers, userdata])
        );
      }
      toast.success("Registration Successful");
      navigate("/");
    } else {
      toast.error("please Enter Valid Details");
      return;
    }

    setemail();
    setpasswrod();
    setphoneno();
    setemail();
  };

  return (
    <Fragment>
      <div className="main-register">
        <div className="main-register-2">
          <div>
            <h2 id="reg">Registration</h2>

            <div>
              <h2 htmlFor="username">Name</h2>
              <input
              className="form-control"
                placeholder="Enter Name"
                type="text"
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  if (username == null) {
                    toast.error("Name Should not be Empty");
                  }
                }}
              />
            </div>

            <div>
              <h2 htmlFor="email">Email</h2>
              <input
              className="form-control"
                placeholder="Enter Email"
                type="text"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  if (email == null || !email.includes("@")) {
                    toast.error("Enter Valid Email");
                  }
                }}
              />
            </div>

            <div>
              <h2 htmlFor="password">Password</h2>
              <input
                placeholder="Enter Password"
              className="form-control"

                type="password"
                onChange={(e) => {
                  setpasswrod(e.target.value);
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  if (password == null) {
                    toast.error("Password Should not be Empty");
                  }
                }}
              />
            </div>

            <div>
              <h2 htmlFor="phoneno">Phone No.</h2>
              <input
                placeholder="Enter Phone no"
              className="form-control"

                type="text"
                onChange={(e) => {
                  setphoneno(e.target.value);
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  if (phoneno == null) {
                    toast.error("Please Enter Valid Phone Number");
                  }
                }}
              />
            </div>

            <button className="btn btn-primary r-b mt-3" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
