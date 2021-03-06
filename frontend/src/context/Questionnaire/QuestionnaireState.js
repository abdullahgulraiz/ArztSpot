import React, { createContext, useReducer} from 'react';
import QuestionnaireReducer from './QuestionnaireReducer';

//Initial state
const initialState = {
    questions: [
        {id: 1, text: 'What does it hurt?', answer: 'Leg'},
        {id: 2, text: 'How severe is the pain?', answer: 'Severe'}
    ],
    type: 'multiple'
}

// Create context

export const QuestionnaireContext = createContext(initialState);

// Provider component
export const QuestionnaireProvider = ({ children }) => {
    const [state, dispatch] = useReducer(QuestionnaireReducer, initialState);

// Actions
    function deleteQuestion(id) {
        dispatch({
            type: 'DELETE_QUESTION',
            payload: id
        });
    }

    function addQuestion(question) {
        dispatch({
            type: 'ADD_QUESTION',
            payload: question
        });
    }

// Set Questionnaire Components
    const setType = (type) => {
        dispatch({
            type: "SET_TYPE",
            payload: type });
    };

    return(<QuestionnaireContext.Provider value = {{
        questions: state.questions,
        type: state.type,
        deleteQuestion,
        addQuestion,
        setType
    }}>
        {children}
    </QuestionnaireContext.Provider>);
}