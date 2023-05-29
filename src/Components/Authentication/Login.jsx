import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  handle_redirection,
  login,
  reset_redirection,
} from "../../Redux/AuthSlice";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { redirection, redirectTo } = useSelector((state) => state?.Auth);

  useEffect(() => {
    dispatch(reset_redirection(null));
  }, [redirection]);

  const re_redirection = () => {
    dispatch(handle_redirection());
    navigate("/login");
  };

  /* Login to Home Redirection code starts here */

  const RedirectUser = () => {
    let token = localStorage.getItem("token");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

    if (token !== null && token !== undefined && token !== "") {
      isInLoginPage && navigate("/");
    }
  };

  useEffect(() => {
    RedirectUser();
  }, [redirectTo]);

  /* Login to Home Redirection code ends here */

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  // console.log(error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validation = () => {
    let error = {};

    if (!user.email) {
      error.email = "Email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      error.email = "Enter a Valid Email";
    }

    if (!user.password) {
      error.password = "Password is Required";
    }

    return error;
  };

  let name, value;

  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "Email is Required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "Password is Required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };

  const SubmitInfo = (e) => {
    e.preventDefault();
    setError(validation());

    let data = {
      email: user.email,
      password: user.password,
    };

    dispatch(login(data));
  };

  return (
    <>
     <ToastContainer />
      <section>
        <div class="form-box-2">
          <div class="form-value">
            <form action="">
              <h2>Sign In</h2>
              <div class="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => postUserData(e)}
                />
                <span style={{ color: "red", marginLeft: "24px" }}>
                  {" "}
                  {error.email}{" "}
                </span>
                <label for="">Email</label>
              </div>

              <div class="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => postUserData(e)}
                />
                <span style={{ color: "red", marginLeft: "24px" }}>
                  {" "}
                  {error.password}{" "}
                </span>
                <label for="">Password</label>
              </div>
              <button onClick={SubmitInfo} type="submit">
                {" "}
                Sign In{" "}
              </button>
              <div class="register">
                <p>
                  Don't have an Account?{" "}
                  <Link
                    to="/registration"
                    onClick={() => {
                      re_redirection();
                    }}
                  >
                    Register  Here...
                  </Link>{" "}
                 
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}


