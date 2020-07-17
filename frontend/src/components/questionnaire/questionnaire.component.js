import React, {useContext} from 'react';
import { QuestionnaireContext } from "../../context/Questionnaire/QuestionnaireState";

import { Question } from "./question.component";
import { AddQuestion } from "./AddQuestion";

const Questionnaire = () => {
    const { questions } = useContext (QuestionnaireContext);
    // console.log(context);
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
                            {questions.map(question => ( <Question key = {question.id} question = {question}/>))}
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