import React, {useState, useContext} from 'react'
import { QuestionnaireContext } from "../../context/Questionnaire/QuestionnaireState";
// import { uniqueId } from "react-bootstrap-typeahead";

export const AddQuestion = () => {
    const[text, setText] = useState('');
    const[answer, setAnswer] = useState('');

    const { addQuestion } = useContext(QuestionnaireContext);

    const onSubmit = e => {
        e.preventDefault();

        const newQuestion = {
            id: Math.floor(Math.random()*100000000),
            text,
            answer
        }
        addQuestion(newQuestion);
    }

    return (
        <>
        <h5>Add a new question</h5>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="inputCity">Question</label>
                <input type="text" className="form-control" value= {text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text..."/>
            </div>
            {/*<div className="form-group">*/}
            {/*    <label htmlFor="inputCity">Answer</label>*/}
            {/*    <input type="text" className="form-control" value= {answer} onChange={(e)=>setAnswer(e.target.value)} placeholder="Enter text..."/>*/}
            {/*</div>*/}

            <div className="row" style={{marginTop: "6%"}}>
                <div className="col-6 offset-3 text-center">
                    <button type="submit" className="btn btn-primary">Add question</button>
                </div>
            </div>
        </form>
        </>
    )
};