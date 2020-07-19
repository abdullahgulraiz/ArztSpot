import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth/AuthState";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { reverse } from "named-urls";
import routes from "../../routes";
import { Link, Redirect } from "react-router-dom";
import { isEmptyObj } from "../../utils/isEmptyObj";
import DashboardContext from "../../context/Dashboard/dashboardContext";

export const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dashboardContext = useContext(DashboardContext);
  const {
    selectedDate,
    doctor,
    appointmentCreated,
    createAppointment,
    setAppointmentCreated,
  } = dashboardContext;
  const { user, setUser, bearerToken, setBearerToken, logoutUser } = useContext(
    AuthContext
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const token = Cookies.get("bearer_token");
    if (token) {
      if (bearerToken !== token) {
        setBearerToken(token);
      }
    }
    if (
      props.location.state !== undefined &&
      "callbackUrl" in props.location.state &&
      callbackUrl === "/" &&
      props.location.state.callbackUrl !== reverse(routes.auth.login)
    ) {
      setCallbackUrl(props.location.state.callbackUrl);
    }
    if (bearerToken && isEmptyObj(user)) {
      getUser();
    }
  });

  const getUser = () => {
    const axiosInstance = axios.create({
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    axiosInstance
      .get("/api/v1/auth/me")
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          logoutUser();
        }
      })
      .catch((error) => {
        logoutUser();
      });
  };

  const onSubmit = (data) => {
    let credentials = {
      email: email,
      password: password,
    };
    axios
      .post("/api/v1/auth/login", credentials)
      .then((response) => {
        if (response.data.success) {
          const token = response.data.token;
          Cookies.set("bearer_token", token);
          setBearerToken(token);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <main id="main">
      {bearerToken && !isEmptyObj(user) && !appointmentCreated && (
        <Redirect
          to={{
            pathname: callbackUrl,
          }}
        />
      )}
      {bearerToken &&
        !isEmptyObj(user) &&
        selectedDate.day &&
        selectedDate.timeSlot &&
        doctor._id && <Redirect to={"/doctors/" + doctor._id} />}

      {bearerToken && isEmptyObj(user) && (
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <p>Please wait...</p>
            </div>
          </div>
        </section>
      )}

      {!bearerToken && (
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Sign In</h2>
              <p>
                Please sign in with your account details to access application
                features.
              </p>
            </div>

            <div className="row">
              <div className="col-6 offset-3">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    Could not sign in. Please check your credentials.
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type={"text"}
                      className={`form-control ${errors.email && "is-invalid"}`}
                      id={"email"}
                      placeholder={"Email"}
                      name={"email"}
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      })}
                      required={"required"}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <div
                        className={`pl-0 invalid-feedback d-inline col-md-6 `}
                      >
                        Email is required.
                      </div>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <div
                        className={`pl-0 invalid-feedback d-inline col-md-6 `}
                      >
                        Introduce a valid email.
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type={"password"}
                      className={"form-control"}
                      id={"password"}
                      placeholder={"Password"}
                      name={"password"}
                      required={"required"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="row" style={{ marginTop: "3%" }}>
                    <div className="col-6 offset-3 text-center">
                      <button type="submit" className="btn btn-primary">
                        Sign in
                      </button>
                    </div>
                  </div>
                  <div className="section-title" style={{ marginTop: "3%" }}>
                    <Link
                      to={reverse(routes.auth.forgot)}
                      className="btn-get-started scrollto"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="section-title">
                    <p>
                      New to ArztSpot?{" "}
                      <a href="auth/register" className="alert-link">
                        Sign up!
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

Login.defaultProps = {
  location: {
    state: {
      callbackUrl: "/",
    },
  },
};
