import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

// Initial state
const initialState = {
    user: {},
    bearerToken: undefined
}

// Create context
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Actions
    function setBearerToken(token) {
        dispatch({
            type: 'SET_BEARER_TOKEN',
            payload: token
        });
    }

    function setUser(user) {
        dispatch({
            type: 'SET_USER',
            payload: user
        });
    }

    function logoutUser() {
        dispatch({
            type: 'LOGOUT_USER'
        });
    }

    return (<AuthContext.Provider value={{
        user: state.user,
        bearerToken: state.bearerToken,
        setBearerToken,
        setUser,
        logoutUser
    }}>
        {children}
    </AuthContext.Provider>);
}