import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import {isEmptyObj} from "../../../utils/isEmptyObj";
import axios from "axios";
import {AuthContext} from "../../../context/auth/AuthState";
import QuestionnaireSuccessful from "../../general/questionnaireSuccessful.component";

export const QuestionsMainPatient = (props) => {

  const initial_state = {
    questions: [],
    doctor: {},
    errorMessage: '',
    forceRedirect: false,
    redirectAfterSuccess: false,
    responses: []
  }

  const [state, setState] = useState(initial_state);

  const { bearerToken } = useContext(AuthContext);

  const doctor = props.doctor;
  const appointment = props.appointment;

  useEffect(() => {
      if (doctor && !isEmptyObj(doctor)) {
        const axiosInstance = axios.create({
          timeout: 1000,
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        });
        axiosInstance
            .get("/api/v1/questions/doctor/" + doctor._id)
            .then(response => {
              if (response.data.success) {
                  if (response.data.count > 0) {
                      let questions = response.data.data;
                      let responsesDict = {};
                      questions.map(q => {
                          responsesDict[q._id] = [];
                      });
                      setState({
                          ...state,
                          questions: response.data.data,
                          responses: responsesDict
                      })
                  }
                  else {
                      setState({ ...state, redirectAfterSuccess: true });
                  }
              } else {
                setState({ ...state, forceRedirect: true });
              }
            })
            .catch(error => {
              console.log("Error", error, error.response);
                setState({ ...state, forceRedirect: true });
            });
      }
  }, []);

  const onSubmit = (e) => {
      e.preventDefault();
      const responsesJson = {
          responses: []
      }
      Object.keys(state.responses).map(k => {
          const response = state.responses[k].filter(r => r.length !== 0);
          if (response.length > 0) {
              responsesJson.responses.push({
                  question: k,
                  response: response,
                  appointment: appointment._id
              });
          }
      });
      const axiosInstance = axios.create({
          headers: {
              'Authorization': `Bearer ${bearerToken}`
          }
      });
      axiosInstance
          .post('/api/v1/questions/answer', responsesJson)
          .then(response => {
              if (response.data.success) {
                  setState({
                      ...state,
                      redirectAfterSuccess: true,
                  })
              }
          })
          .catch(error => {
              console.log("Error submitting questionnaire: ", error, error.response);
              setState({
                  ...state,
                  errorMessage: "There was an error submitting your responses. Please try again, or contact us if the problem persists."
              })
          });
  }

  const onChange = (question, value) => {
      if (question.type === "Text" || question.type === "Single Choice") {
          let responsesDict = state.responses;
          responsesDict[question._id] = [value];
          setState({
              ...state,
              responses: responsesDict
          });
      } else if (question.type === "Multiple Choice") {
          let responsesDict = state.responses;
          if (question.choices.includes(value)) {
              // add value to responses if does not exist
              if (!responsesDict[question._id].includes(value)) {
                  responsesDict[question._id].push(value);
              }
              // else remove value from existing responses
              else {
                  responsesDict[question._id] = responsesDict[question._id].filter(r => r !== value);
              }
              setState({
                  ...state,
                  responses: responsesDict
              });
          }
      }
  }

  if (!props.doctor || state.forceRedirect || !props.appointment) {
      return (
          <Redirect
              to={{
                  pathname: '/',
              }}
          />
      )
  }

    if (state.redirectAfterSuccess) {
        return (
            <QuestionnaireSuccessful />
        )
    }

    return (

      <main id="main">

        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Patient Questionnaire</h2>
              <p>Please answer the following optional questions for your booked appointment, which will only be used by the doctor and for the purpose of your diagnosis.</p>
            </div>

              <div className="row" style={{marginTop: "1em"}}>
              <div className="col-12">
              {state.errorMessage &&
                  <div className="alert alert-danger" role="alert">
                      {state.errorMessage}
                  </div>
              }
              {
                  state.questions && state.questions.length > 0 &&
                  <form onSubmit={onSubmit}>
                  {
                      state.questions.map((question,idx) => {
                          return (
                              <>
                                  <div style={{marginTop: "1.5em"}}>
                                  <b>{idx + 1}. {question.description}</b>
                                  <div style={{paddingLeft: "2em", paddingTop:"0.5em"}}>
                                      {
                                          question.type === "Single Choice" &&
                                          question.choices.map((c, idx) => {
                                              return (
                                                  <div className="form-check">
                                                      <input className="form-check-input" type="radio" name={question._id} id={question._id + "_" + idx} onChange={() => onChange(question, c) } />
                                                      <label className="form-check-label" htmlFor={question._id + "_" + idx}>
                                                          {c}
                                                      </label>
                                                  </div>
                                              )
                                          })
                                      }
                                      {
                                          question.type === "Multiple Choice" &&
                                          question.choices.map((c, idx) => {
                                              return (
                                                  <div className="form-check">
                                                      <input className="form-check-input" type="checkbox" id={question._id + "_" + idx} onChange={() => onChange(question, c) } />
                                                      <label className="form-check-label" htmlFor={question._id + "_" + idx}>
                                                          {c}
                                                      </label>
                                                  </div>
                                              )
                                          })
                                      }
                                      {
                                          question.type === "Text" &&
                                          <input type={"text"} className={"form-control"} style={{width: "70%"}} onChange={(e) => onChange(question, e.target.value)} />
                                      }
                                  </div>
                                  </div>
                              </>
                          )
                      })
                  }
                  <div className="form-row">
                      <div className="form-group col-md-8 offset-2 text-center">
                          <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                  </div>
                  </form>
              }
              </div>

              </div>
          </div>
        </section>

      </main>

    );
}