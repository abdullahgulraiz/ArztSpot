import React, {useState, useContext, Fragment} from 'react'
import { QuestionnaireContext } from "../../../../context/Questionnaire/QuestionnaireState";
import TypeaheadSearch from "../../../search/TypeaheadSearch";
import symptoms from "../../../../data/symptoms";
import specialization from "../../../../data/specialization";
import {useForm} from "react-hook-form";
// import { uniqueId } from "react-bootstrap-typeahead";

export const AddQuestion = () => {
    const[text, setText] = useState('');
    const[option1, setOption1] = useState('');
    const[option2, setOption2] = useState('');
    const[option3, setOption3] = useState('');
    const[option4, setOption4] = useState('');
    const[option5, setOption5] = useState('');

    const { type, addQuestion, setType, questions } = useContext(QuestionnaireContext);
    const { handleSubmit } = useForm();

    const onSubmit = e => {
        e.preventDefault();
        setType({ ...questions, [e.target.name]: e.target.value });

        const newQuestion = {
            id: Math.floor(Math.random()*100000000),
            text,
            option1,
            option2,
            option3,
            option4,
            option5
        }
        addQuestion(newQuestion);
    }
    console.log(type)

    return (
        <>
        <h5>Add a new question</h5>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="inputCity">Question</label>
                <input type="text" className="form-control" value= {text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text..."/>
            </div>
            { type === "multiple" && (
            <div className="form-group justify-content-center">
                <label htmlFor="exampleFormControlSelect2">Add your options: </label>
                <div className="form-group row">
                    <label htmlFor="inputOption1" className="col-sm-1 col-form-label">1. </label>
                    <div className="col-sm-11">
                        <input type="option" className="form-control" value= {option1} onChange={(e)=>setOption1(e.target.value)} id="Option1" placeholder="First option..."/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputOption2" className="col-sm-1 col-form-label">2. </label>
                    <div className="col-sm-11">
                        <input type="option" className="form-control" value= {option2} onChange={(e)=>setOption2(e.target.value)} id="Option2" placeholder="Second option..."/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputOption3" className="col-sm-1 col-form-label">3. </label>
                    <div className="col-sm-11">
                        <input type="option" className="form-control" value= {option3} onChange={(e)=>setOption3(e.target.value)} id="Option3" placeholder="Third option..."/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputOption4" className="col-sm-1 col-form-label">4. </label>
                    <div className="col-sm-11">
                        <input type="option" className="form-control" value= {option4} onChange={(e)=>setOption4(e.target.value)} id="Option4" placeholder="Fourth option..."/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputOption5" className="col-sm-1 col-form-label">5. </label>
                    <div className="col-sm-11">
                        <input type="option" className="form-control" value= {option5} onChange={(e)=>setOption5(e.target.value)} id="Option5" placeholder="Fifth option..."/>
                    </div>
                </div>
            </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                    <Fragment>
                        <h6 className="card-subtitle my-2 text-muted">Select the symptom(s) to which this question is related</h6>{" "}
                        <TypeaheadSearch
                            props={{
                                data: symptoms,
                                multiple: true,
                                name: "symptoms",
                                // setFunction: setSearch,
                                // state: search,
                                placeholder: "Choose symptom..."
                            }}
                        />{" "}
                    </Fragment>
            </form>

            <div className="row" style={{marginTop: "6%"}}>
                <div className="col-6 offset-3 text-center">
                    <button type="submit" className="btn btn-primary">Add question</button>
                </div>
            </div>
        </form>
        </>
    )
};