import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { datasliceactions } from "../store/dataslice";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const [emaillog, setEmaillog] = useState();
  const [passwordlog, setPasswordlog] = useState();

  const usersdata = JSON.parse(localStorage.getItem("users"));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      emaillog == null ||
      emaillog == undefined ||
      passwordlog == null ||
      passwordlog == undefined
    ) {
      toast.error("please Enter Details");
      return;
    }

    let authUser = usersdata.find((elem) => {
      return elem.email === emaillog;
    });

    if (authUser == undefined) {
      toast.error("No User Found!!");
    }

    if (authUser) {
      if (passwordlog === authUser.password) {
        toast.success("Login Success");
        localStorage.setItem("userLog", JSON.stringify(authUser));
        dispatch(datasliceactions.login());
        dispatch(datasliceactions.currentuser(authUser));
      } else {
        toast.error("Wrong Password");
      }
    }
    setEmaillog();
    setPasswordlog();
  };

  return (
    <Fragment>
      <div className="main-login-01">
        <div className="main-login">
          <div>
            <h2 id="log">Login</h2>
          </div>

          <div>
            <h2>Email</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              onChange={(event) => {
                setEmaillog(event.target.value);
              }}
              onBlur={() => {
                if (emaillog == null || !emaillog.includes("@")) {
                  toast.error("Enter Valid Email");
                }
              }}
            />
          </div>

          <div>
            <h2 className="form-label">Password</h2>
            <input
              className="form-control"
              type="password"
              placeholder="Enter Password"
              onChange={(event) => {
                setPasswordlog(event.target.value);
              }}
              onBlur={() => {
                if (passwordlog == null) {
                  toast.error("Enter password");
                }
              }}
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
