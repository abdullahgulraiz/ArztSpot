import React, {useContext} from 'react'
import { AuthContext } from './AuthState';
import { reverse } from 'named-urls'
import routes from "../../routes";
import {Redirect, Route} from 'react-router-dom';
import Unauthorized from "../../components/general/unauthorized.component";

export const DoctorRoute = (props) => {
    const { component: Component, ...props_rest } = props
    const { bearerToken, user } = useContext(AuthContext);
    let valid_user = false;
    user.role === "doctor" ? valid_user = true : valid_user = false;
    return (
        <Route
            {...props_rest}
            render={props_rest => {
                if (bearerToken && valid_user) {
                    return <Component {...props_rest} />
                } else if (!bearerToken) {
                    return <Redirect to={{
                        pathname: reverse(routes.auth.login),
                        state: {callbackUrl: window.location.pathname}
                    }} />
                } else {
                    return <Unauthorized />
                }
            }}
        />
    )
}

export const AuthRoute = (props) => {
  const { component: Component, ...props_rest } = props
  const { bearerToken, user } = useContext(AuthContext);
  let valid_user = false;
  (user.role === "doctor" || user.role === "user") ? valid_user = true : valid_user = false;
  return (
    <Route
      {...props_rest}
      render={props_rest => {
        if (bearerToken && valid_user) {
          return <Component {...props_rest} />
        } else if (!bearerToken) {
          return <Redirect to={{
            pathname: reverse(routes.auth.login),
            state: {callbackUrl: window.location.pathname}
          }} />
        } else {
          return <Unauthorized />
        }
      }}
    />
  )
}

export const PatientRoute = (props) => {
    const { component: Component, ...props_rest } = props
    const { bearerToken, user } = useContext(AuthContext);
    let valid_user = false;
    user.role === "user" ? valid_user = true : valid_user = false;
    return (
        <Route
            {...props_rest}
            render={props_rest => {
                if (bearerToken && valid_user) {
                    return <Component {...props_rest} />
                } else if (!bearerToken) {
                    return <Redirect to={{
                        pathname: reverse(routes.auth.login),
                        state: {callbackUrl: window.location.pathname}
                    }} />
                } else {
                    return <Unauthorized />
                }
            }}
        />
    )
}