import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

// Initial state
const initialState = {
    is_authenticated: true,
    callbackUrl: '/',
    user: {
        role: "doctor",
        languages: [
            "spanish",
            "german"
        ],
        _id: "5ee7b96a3431feba57523d03",
        firstname: "Mario",
        lastname: "Perez",
        email: "marioperez@hotmail.com",
        specialization: "Dermatology",
        createdAt: "2020-06-16T13:33:06.451Z",
        __v: 0
    }
}

// Create context
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Actions
    function loginUser(user) {
        dispatch({
            type: 'LOGIN_USER',
            payload: user
        });
    }

    function logoutUser(user) {
        dispatch({
            type: 'LOGOUT_USER',
            payload: user
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
        loginUser,
        logoutUser,
        setCallbackUrl
    }}>
        {children}
    </AuthContext.Provider>);
}