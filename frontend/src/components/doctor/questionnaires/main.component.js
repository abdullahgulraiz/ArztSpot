import React, {Component, useContext, useEffect, useState} from 'react';
import {reverse} from "named-urls";
import routes from "../../../routes";
import {Link, Redirect} from "react-router-dom";
import {isEmptyObj} from "../../../utils/isEmptyObj";
import NotFound from "../../general/notfound.component";
import axios from "axios";
import {AuthContext} from "../../../context/auth/AuthState";
import moment from "moment";
import {get} from "react-hook-form";

export const QuestionsMainDoctor = (props) => {

  const initial_state = {
    show: 'all',
    symptoms: [],
    questions: [],
    error404: false,
    errorMessage: '',
    infoMessage: '',
  }

  const [state, setState] = useState(initial_state);

  const { bearerToken } = useContext(AuthContext);

  useEffect(() => {
    const axiosInstance = axios.create({
      timeout: 1000,
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    });
    axiosInstance
        .get("/api/v1/questions")
        .then(response => {
          if (response.data.success) {
            const questions = response.data.data;
            let availableSymptoms = getSymptoms(questions);
            setState({
              ...state,
              questions: questions,
              symptoms: availableSymptoms
            });
          } else {
            setState({
              ...state,
              errorMessage: "There was a problem retrieving questions from the server. Please try again later, or contact us if the problem persists.",
              infoMessage: ''});
          }
        })
        .catch(error => {
          console.log("Error", error, error.response);
          setState({
            ...state,
            errorMessage: "There was a problem retrieving questions from the server. Please try again later, or contact us if the problem persists.",
            infoMessage: ''
          });
        });
  }, []);

  const getSymptoms = (questions) => {
    let availableSymptoms = [];
    questions.map(q => {
      q.symptoms.map(s => {
        if (!availableSymptoms.includes(s.name)) {
          availableSymptoms.push(s.name);
        }
      });
    });
    return availableSymptoms;
  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const deleteQuestion = (id) => {
      console.log("Delete questionnaire", id);
      const axiosInstance = axios.create({
          headers: {
              'Authorization': `Bearer ${bearerToken}`
          }
      });
      axiosInstance
          .delete('/api/v1/questions/'+id)
          .then(response => {
              if (response.data.success) {
                  let questions = state.questions.filter(q => {
                      return q._id !== id;
                  });
                  let availableSymptoms = getSymptoms(questions);
                  setState({
                    ...state,
                    errorMessage: "",
                    infoMessage: 'The question was deleted successfully.',
                    questions: questions,
                    symptoms: availableSymptoms
                  });
              }
          })
          .catch(error => {
              console.log("Error deleting prescription: ", error);
              setState({
                ...state,
                errorMessage: "There was a problem deleting the question from server. Please try again later, or contact us if the problem persists.",
                infoMessage: ''
              });
          });
  }

  if (state.error404) {
    return (
        <NotFound />
    )
  }

    return (

      <main id="main">

        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Questions</h2>
              <p>These are the questions your patients will be asked to answer when booking an appointment.</p>
            </div>

              <div className="row" style={{marginTop: "1em"}}>
              <div className="col-12">
              {state.errorMessage &&
                  <div className="alert alert-danger" role="alert">
                      {state.errorMessage}
                  </div>
              }
              {state.infoMessage &&
              <div className="alert alert-info" role="alert">
                {state.infoMessage}
              </div>
              }
              <h4>All Questions</h4>
              <div className="form-row">
              <div className="form-group col-md-4">
              <label htmlFor="inputState">Show for</label>
              <select id="inputState" name={"show"} className="form-control" defaultValue={"all"} onChange={onChange}>
              <option value={"all"}>All symptoms</option>
              {
                  state.symptoms.map(s => {
                      return (
                          <option value={s}>{s}</option>
                      )
                  })
              }
              </select>
              </div>
              <div className="form-group col-md-3 offset-5 text-right">
              <Link to={{
              pathname: reverse(routes.doctor.prescriptions.create, {patientId: props.match.params.patientId})
            }} className={"btn btn-secondary"} style={{marginTop: "13%"}}>New Question</Link>
              </div>
              </div>
              <div>
              <table className="table table-hover">
              <thead>
              <tr>
              <th scope="col">#</th>
              <th scope="col">Question</th>
              <th scope="col">Symptoms</th>
              <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              {state.questions.length > 0 &&
                state.questions
                    .filter(question => {
                      if (state.show !== 'all') {
                        if (question.symptoms.map(s => s.name).includes(state.show)) {
                          return question;
                        }
                      } else {
                        return question;
                      }
                    })
                    .map((question, index) => {
                      return (
                          <QuestionResultRow question={question} index={index} deleteQuestion={deleteQuestion} />
                      );
                    })
              }
              {state.questions.length <= 0 &&
                <tr>
                  <td colSpan={6} className={"text-center"}>You have not added any questions yet.</td>
                </tr>
              }
              </tbody>
              </table>
              </div>
              </div>

              </div>
          </div>
        </section>

      </main>

    );
}

const QuestionResultRow = props => {
  const question = props.question;
  const index = props.index;
  return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>
          {question.description}
          <div style={{paddingLeft: "1em", paddingTop: "0.5em"}}>
          {
            question.type === "Single Choice" &&
              question.choices.map((c, idx) => {
                return (
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name={question._id} id={question._id + "_" + idx} checked={idx === 0} />
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
                    <input className="form-check-input" type="checkbox" id={question._id + "_" + idx} />
                      <label className="form-check-label" htmlFor={question._id + "_" + idx}>
                        {c}
                      </label>
                  </div>
              )
            })
          }
          {
            question.type === "Text" &&
            <input type={"text"} className={"form-control"} style={{width: "70%"}} />
          }
          </div>
        </td>
        <td>{question.symptoms.map(s => s.name).join(", ")}</td>
        <td>
          {question.responses.length <= 0 &&
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => {props.deleteQuestion(question._id)}}>
              <i className="icofont-trash"></i></button>
          }
        </td>
      </tr>
  )
}