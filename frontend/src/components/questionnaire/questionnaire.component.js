import React, {useContext} from 'react';
import { QuestionnaireContext } from "../../context/Questionnaire/QuestionnaireState";

import { Question } from "./question.component";
import { AddQuestion } from "./AddQuestion";
import SearchContext from "../../context/Search/searchContext";

const Questionnaire = () => {
    const { questions, setType, type } = useContext (QuestionnaireContext);
    // console.log(context);
    // const { search, setSearch, doctorSearch, pagination } = searchContext;

    // const onChange = (e) =>
    //     // setQuestion({ ...questions, [e.target.name]: e.target.value });
    //     setType({[e.target.name]: e.target.value });

    return (
        <main id="main">
            <div className="row" style={{marginTop: "3%"}}>
                <div className="col-6 offset-3">
                    <form>
                        <div className="form-group justify-content-center">
                            <h4>My questionnaire</h4>
                            <h6>These are the questions your patients will be asked to answer when booking an appointment.</h6>
                        </div>
                        <div className="form-group justify-content-center">
                            {questions.map(question => ( <Question key = {questions.id} question = {question}/>))}
                        </div>

                        <div className="form-group justify-content-center">
                            <div className="form-check">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="customRadioInline1" name="type" value ="open"
                                           className="custom-control-input" onChange={(e)=>setType(e.target.value)}/>
                                    <label className="custom-control-label" htmlFor="customRadioInline1">Open question</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="customRadioInline2" name="type" value = "multiple"
                                           className="custom-control-input" onChange={(e)=>setType(e.target.value)}/>
                                    <label className="custom-control-label" htmlFor="customRadioInline2">Multiple choice</label>
                                </div>
                            </div>
                        </div>


                        <div className="form-group justify-content-center">
                            <AddQuestion/>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Questionnaire;