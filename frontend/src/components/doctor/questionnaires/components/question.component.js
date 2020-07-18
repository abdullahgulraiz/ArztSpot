import React, { useContext } from 'react';
import { QuestionnaireContext } from "../../../../context/Questionnaire/QuestionnaireState";


export const Question = ({ question }) => {

    const { deleteQuestion } = useContext( QuestionnaireContext);

    return (
        <>
            {/*<div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">*/}
                <div className="form-row">
                    <div className="form-group col-md-10">
                        <label htmlFor="exampleFormControlSelect2">{question.text}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <td style = {{marginLeft: '3%'}}>
                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => deleteQuestion(question.id) }><i className="icofont-trash"></i></button>
                        </td>
                    </div>
                </div>
            {/*</div>*/}
            {/*<select multiple className="form-control" id="exampleFormControlSelect2">*/}
            {/*    <option>{question.answer}</option>*/}
            {/*</select>*/}
        </>
    )
}