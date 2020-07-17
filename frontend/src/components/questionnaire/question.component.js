import React from 'react';

export const Question = ({ question }) => {
    return (
        <>
            <label htmlFor="exampleFormControlSelect2">{question.text}</label>
            <select multiple className="form-control" id="exampleFormControlSelect2">
                <option>{question.answer}</option>
            </select>
        </>
    )
}