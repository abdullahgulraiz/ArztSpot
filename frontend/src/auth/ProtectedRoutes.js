import React, {useContext} from 'react'
import { AuthContext } from './AuthState';
import { reverse } from 'named-urls'
import routes from "../routes";
import {Redirect, Route} from 'react-router-dom';
import Unauthorized from "../components/general/unauthorized.component";

export const DoctorRoute = (props) => {
    const { component: Component, ...props_rest } = props

    const { is_authenticated, user, callbackUrl, setCallbackUrl } = useContext(AuthContext);

    let valid_user = false;
    user.role === "doctor" ? valid_user = true : valid_user = false;
    if (!is_authenticated && callbackUrl !== window.location.pathname) {
        setCallbackUrl(window.location.pathname);
        console.log("Check 1");
    }
    console.log("Check 2", valid_user, user);

    return (
        <Route
            {...props_rest}
            render={props_rest => (
                is_authenticated && valid_user ?
                    <Component {...props_rest} /> :
                    !is_authenticated ?
                        <Redirect to={reverse(routes.auth.login)} /> :
                        <Unauthorized />
            )}
        />
    )
}

export const PatientRoute = (props) => {
    const { component: Component, ...props_rest } = props

    const { is_authenticated, user, callbackUrl, setCallbackUrl } = useContext(AuthContext);

    let valid_user = false;
    user.role === "user" ? valid_user = true : valid_user = false;
    if (!is_authenticated && callbackUrl !== window.location.pathname) {
        setCallbackUrl(window.location.pathname);
    }

    return (
        <Route
            {...props_rest}
            render={props_rest => (
                is_authenticated && valid_user ?
                    <Component {...props_rest} /> :
                    !is_authenticated ?
                        <Redirect to={reverse(routes.auth.login)} /> :
                        <Unauthorized />
            )}
        />
    )
}

export const NoAuthRoute = (props) => {
    const { component: Component, ...props_rest } = props

    const { is_authenticated } = useContext(AuthContext);

    return (
        <Route
            {...props_rest}
            render={props_rest => (
                !is_authenticated ?
                    <Component {...props_rest} /> :
                    <Redirect to="/" />
            )}
        />
    )
}