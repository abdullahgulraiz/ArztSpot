import React, {Component, useEffect, useState} from 'react';
import {reverse} from "named-urls";
import routes from "../../../routes";
import {Link, Redirect} from "react-router-dom";
import {isEmptyObj} from "../../../utils/isEmptyObj";
import NotFound from "../../general/notfound.component";

export const PrescriptionsPatient = (props) => {

  const initial_state = {
    patient: {},
    show: 'all',
    error404: false,
    searchResults: [
      {
        'id': '1',
        'appointmentDate': 'July 10, 2020',
        'issuedOn': "July 12, 2020",
        'symptoms': ["Asthma", "COPD", "Headache"],
        'status': "Sent"
      },
      {
        'id': '2',
        'appointmentDate': 'July 05, 2019',
        'issuedOn': "July 08, 2019",
        'symptoms': ["Body pain", "Cough", "Fever"],
        'status': "Pending"
      },
    ]
  }

  const [state, setState] = useState(initial_state);

  useEffect(() => {
    setTimeout(() => {
      setState({
        ...state,
        patient: {
          name: "John Smith"
        },
      });
    }, 3000)
  }, []);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const downloadReport = (id) => {
    console.log("Downloading report for id", id);
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
              <h2>Prescriptions</h2>
              {!isEmptyObj(state.patient) &&
              <p>Manage prescriptions for {state.patient.name}</p>
              }
              {isEmptyObj(state.patient) &&
              <p>Loading prescriptions...</p>
              }
            </div>
            {!isEmptyObj(state.patient) &&
            <>
            <div className="row">
              <div className="col-12">
                <Link to={reverse(routes.doctor.prescriptions.search)} className="btn btn-secondary btn-sm"><i className="icofont-arrow-left"></i> Back</Link>
              </div>
            </div>

              <div className="row" style={{marginTop: "1em"}}>
              <div className="col-12">
              <h4>Patient Record</h4>
              <div className="form-row">
              <div className="form-group col-md-4">
              <label htmlFor="inputState">Show</label>
              <select id="inputState" name={"show"} className="form-control" defaultValue={"all"} onChange={onChange}>
              <option value={"all"}>All</option>
              <option value={"sent"}>Sent</option>
              <option value={"pending"}>Pending</option>
              </select>
              </div>
              <div className="form-group col-md-3 offset-5 text-right">
              <Link to={{
              pathname: reverse(routes.doctor.prescriptions.create, {patientId: props.match.params.patientId})
            }} className={"btn btn-secondary"} style={{marginTop: "13%"}}>New Prescription</Link>
              </div>
              </div>
              <div>
              <table className="table table-hover">
              <thead>
              <tr>
              <th scope="col">#</th>
              <th scope="col">Appointment date</th>
              <th scope="col">Issued on</th>
              <th scope="col">Symptoms</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              {state.searchResults.length > 0 &&
                state.searchResults
                    .filter(searchResult => {
                      if (state.show === 'sent') {
                        if (searchResult.status === 'Sent') {
                          return searchResult;
                        }
                      } else if (state.show === 'pending') {
                        if (searchResult.status === 'Pending') {
                          return searchResult;
                        }
                      } else {
                        return searchResult;
                      }
                    })
                    .map((searchResult, index) => {
                      return (
                          <SearchResultRow result={searchResult} index={index} downloadReport={downloadReport}/>
                      );
                    })
              }
              {state.searchResults.length <= 0 &&
                <tr>
                  <td colSpan={6} className={"text-center"}>There are no Prescriptions created for this patient.</td>
                </tr>
              }
              </tbody>
              </table>
              </div>
              </div>

              </div>
            </>
            }
          </div>
        </section>

      </main>

    );
}

const SearchResultRow = props => {
  const searchResult = props.result;
  const index = props.index;
  return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{searchResult.appointmentDate}</td>
        <td>{searchResult.issuedOn}</td>
        <td>{searchResult.symptoms.join(", ")}</td>
        <td>{searchResult.status}</td>
        <td><button type="button" className="btn btn-secondary btn-sm" onClick={() => {props.downloadReport(searchResult.id)}}>
          <i className="icofont-download"></i></button></td>
      </tr>
  )
}