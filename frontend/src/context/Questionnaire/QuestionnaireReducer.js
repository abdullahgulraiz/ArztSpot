export default (state, action) => {
    switch(action.type) {
        case 'DELETE_QUESTION':
            return {
                ...state,
                questions: state.questions.filter(question => question.id !== action.payload)
            }
        case 'ADD_QUESTION':
            return {
                ...state,
                questions: [action.payload, ...state.questions]
            }
        case 'SET_TYPE':
            return {
                ...state,
                type: action.payload
            }
        default:
            return state;
    }
}