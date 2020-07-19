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

export const QuestionsNewDoctor = (props) => {

  const initial_state = {
    errorMessage: '',
    description: '',
    type: 'Text',
    choices: '',
    symptoms: '',
    questionCreated: false
  }

  const [state, setState] = useState(initial_state);

  const { bearerToken } = useContext(AuthContext);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const validateFields = () => {
    let fields_to_validate = [];
    if (state.description.length <= 0) fields_to_validate.push("Please enter a valid Description for the question.");
    if (state.type !== 'Text' && state.choices.length <= 0) fields_to_validate.push("Please enter at least one Choice relevant to the question.");
    if (state.symptoms.length <= 0) fields_to_validate.push("Please enter at least one Symptom relevant to the question.");
    if (fields_to_validate.length > 0) {
        setState({
            ...state,
            errorMessage: fields_to_validate
        })
        return false;
    }
    return true;
}

  const onSubmit = (e) => {
      e.preventDefault();
      if (!validateFields()) {
          return;
      } else {
          setState({
              ...state,
              errorMessage: []
          })
      }
      let newQuestion = {
          description: state.description,
          type: state.type,
          choices: state.type !== 'Text' ? state.choices.trim().split(",").filter(c => c.length > 0) : [],
          symptoms: state.symptoms.split(',')
      }
      const axiosInstance = axios.create({
          headers: {
              'Authorization': `Bearer ${bearerToken}`
          }
      });
      axiosInstance
          .post('/api/v1/questions/', newQuestion)
          .then(response => {
              if (response.data.success) {
                  setState({
                    ...state,
                    questionCreated: true
                  });
              }
          })
          .catch(error => {
              console.log("Error deleting prescription: ", error);
              setState({
                ...state,
                errorMessage: ["There was a problem deleting the question from server. Please try again later, or contact us if the problem persists."],
              });
          });
  }

  if (state.error404) {
    return (
        <NotFound />
    )
  }

    if (state.questionCreated) {
        return (
            <Redirect
                to={{
                    pathname: reverse(routes.doctor.questions.main),
                    state: { questionCreated: true }
                }}
            />
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
              <div className="row">
                  <div className="col-12">
                      <Link to={reverse(routes.doctor.questions.main)} className="btn btn-secondary btn-sm"><i className="icofont-arrow-left"></i> Back</Link>
                  </div>
              </div>
              <div className="row" style={{marginTop: "1em"}}>
              <div className="col-12">
              {state.errorMessage && state.errorMessage.length > 0 &&
              <div className="alert alert-danger" role="alert">
                  <ul>
                      {state.errorMessage.map(err => {
                          return (
                              <li>{err}</li>
                          )
                      })
                      }
                  </ul>
              </div>
              }
              {state.infoMessage &&
              <div className="alert alert-info" role="alert">
                {state.infoMessage}
              </div>
              }
              <h4>New Question</h4>
              <form onSubmit={onSubmit}>
              <div className="form-row">
                  <div className="form-group col-md-8 offset-2">
                      <label htmlFor="description">Description</label>
                      <input type="text" className="form-control" id="description" placeholder="Description" name={"description"} onChange={onChange} />
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-md-8 offset-2">
                      <label htmlFor="type">Type</label>
                      <select id="type" name={"type"} className="form-control" defaultValue={"Text"} onChange={onChange}>
                      <option value={"Text"}>Text</option>
                      <option value={"Single Choice"}>Single Choice</option>
                      <option value={"Multiple Choice"}>Multiple Choice</option>
                      </select>
                  </div>
              </div>
              {state.type !== 'Text' &&
              <div className="form-row">
                  <div className="form-group col-md-8 offset-2">
                      <label htmlFor="choices">Choices (separate each with <b>,</b>)</label>
                      <input type="text" className="form-control" id="choices" placeholder="Example: Choice 1, Another Choice 2, My Choice 3" name={"choices"} onChange={onChange} />
                  </div>
              </div>
              }
              <div className="form-row">
                  <div className="form-group col-md-8 offset-2">
                      <label htmlFor="symptoms">Symptoms (separate each with <b>,</b>)</label>
                      <input type="text" className="form-control" id="symptoms" placeholder="Example: Asthma, COPD, Headache" name={"symptoms"} onChange={onChange} />
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-md-8 offset-2 text-center">
                      <button type="submit" className="btn btn-primary">Save</button>
                  </div>
              </div>
              </form>
              {/*<div className="form-row">*/}
              {/*    <div className="form-group col-md-5 offset-2">*/}
              {/*        <label htmlFor="symptoms">Symptoms</label>*/}
              {/*    </div>*/}
              {/*    <div className="form-group col-md-3 text-right">*/}
              {/*        <button type="button" onClick={() => {state.symptoms.push("")}} className="btn btn-secondary btn-sm pull-right"><i className="icofont-ui-add"></i></button>*/}
              {/*    </div>*/}
              {/*</div>*/}
              {/*{*/}
              {/*    state.symptoms.map((s,idx) => {*/}
              {/*        console.log("Check 1");*/}
              {/*      return (*/}
              {/*          <div className="form-row">*/}
              {/*              <div className="form-group col-md-7 offset-2">*/}
              {/*                  <input type="text" className="form-control" id="symptoms" placeholder="Symptom" name={"symptoms"} defaultValue={s} />*/}
              {/*              </div>*/}
              {/*              <div className="form-group col-md-1 text-right">*/}
              {/*                  <button type="button" className="btn btn-secondary btn-sm">*/}
              {/*                      <i className="icofont-trash"></i>*/}
              {/*                  </button>*/}
              {/*              </div>*/}
              {/*          </div>*/}
              {/*      )*/}
              {/*    })*/}
              {/*}*/}
              </div>
              </div>
          </div>
        </section>

      </main>

    );
}