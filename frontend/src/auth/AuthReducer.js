import Cookies from 'js-cookie'

export default (state, action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            const user = action.payload.user;
            return {
                ...state,
                callbackUrl: '/',
                user: user,
                is_authenticated: true,
                axios: action.payload.axios
            }
        case 'LOGOUT_USER':
            Cookies.remove('bearer_token');
            return {
                ...state,
                is_authenticated: false,
                callbackUrl: '/',
                user: {}
            }
        case 'SET_CALLBACK_URL':
            return {
                ...state,
                callbackUrl: action.payload
            }
        default:
            return state;
    }
}