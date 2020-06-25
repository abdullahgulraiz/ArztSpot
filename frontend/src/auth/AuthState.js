import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

// Initial state
const initialState = {
    is_authenticated: false,
    callbackUrl: '/',
    user: {},
    axios: null,
}

// Create context
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Actions
    function loginUser(user, axios) {
        dispatch({
            type: 'LOGIN_USER',
            payload: {
                user: user,
                axios: axios
            }
        });
    }

    function logoutUser() {
        dispatch({
            type: 'LOGOUT_USER',
        });
    }

    function setCallbackUrl(url) {
        dispatch({
            type: 'SET_CALLBACK_URL',
            payload: url
        });
    }

    return (<AuthContext.Provider value={{
        is_authenticated: state.is_authenticated,
        user: state.user,
        callbackUrl: state.callbackUrl,
        axios: state.axios,
        loginUser,
        logoutUser,
        setCallbackUrl
    }}>
        {children}
    </AuthContext.Provider>);
}