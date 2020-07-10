import Cookies from 'js-cookie'

export default (state, action) => {
    switch(action.type) {
        case 'SET_BEARER_TOKEN':
            return {
                ...state,
                bearerToken: action.payload
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT_USER':
            Cookies.remove("bearer_token");
            return {
                ...state,
                user: {},
                bearerToken: undefined
            }
        default:
            return state;
    }
}