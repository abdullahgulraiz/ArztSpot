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
                            <h5>In order to finalise your booking, please answer the following questions.</h5>
                            <p>This will take only a few minutes.</p>
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