export default (state, action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case 'LOGOUT_USER':
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