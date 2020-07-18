import React, {Component, useContext, useEffect, useState} from 'react';
import {reverse} from "named-urls";
import routes from "../../../routes";
import {Link, Redirect} from "react-router-dom";
import {isEmptyObj} from "../../../utils/isEmptyObj";
import NotFound from "../../general/notfound.component";
import axios from "axios";
import {AuthContext} from "../../../auth/AuthState";
import moment from "moment";

export const PrescriptionsPatient = (props) => {

  const initial_state = {
    show: 'all',
    error404: false,
    searchResults: [],
    errorDownload: false,
    errorSend: false,
    successSend: false,
    errorDelete: false,
    successDelete: false,
  }

  const [state, setState] = useState(initial_state);
  const [patient, setPatient] = useState({});

  const { bearerToken } = useContext(AuthContext);

  useEffect(() => {
    const axiosInstance = axios.create({
      timeout: 1000,
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    });
    axiosInstance
        .get("/api/v1/doctors/mypatients/" + props.match.params.patientId)
        .then(response => {
          if (response.data.success) {
            setPatient(response.data.data);
            return axiosInstance.get("/api/v1/prescriptions?patient=" + props.match.params.patientId);
          } else {
            setState({ ...state, error404: true });
          }
        })
        .then(response => {
          let search_results = [];
          response.data.data.map(d => {
            search_results.push({
              'id': d._id,
              'appointmentDate': moment(d.appointment.startTime).format("YYYY-MM-DD"),
              'issuedOn': moment(d.date).format("YYYY-MM-DD"),
              'symptoms': d.appointment.symptoms && d.appointment.symptoms.length > 0 ? d.appointment.symptoms.map(s => s.name) : ["Not defined"],
              'status': d.isSent ? "Sent" : "Pending"
            });
          });
          setState({...state, searchResults: search_results });
        })
        .catch(error => {
          console.log("Error", error, error.response);
          setState({ ...state, error404: true, patient: {} });
        });
  }, []);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const downloadReport = (id) => {
      const axiosInstance = axios.create({
          headers: {
              'Authorization': `Bearer ${bearerToken}`
          }
      });
      axiosInstance
          .get('/api/v1/prescriptions/'+id+'/download', {responseType: 'blob'})
          .then(response => {
              setState({
                  ...state,
                  errorDownload: false,
                  errorSend: false,
                  successSend: false,
                  errorDelete: false,
                  successDelete: false
              })
              //Create a Blob from the PDF Stream
              const file = new Blob(
                  [response.data],
                  {type: 'application/pdf'});//Build a URL from the file
              const fileURL = URL.createObjectURL(file);//Open the URL on new Window
              window.open(fileURL);
          })
          .catch(error => {
              console.log("Error generation PDF: ", error);
              setState({
                  ...state,
                  errorDownload: true,
                  errorSend: false,
                  successSend: false,
                  errorDelete: false,
                  successDelete: false
              })
          });
  }

  const sendReport = (id) => {
    console.log("Sending report for id", id);
      const axiosInstance = axios.create({
          headers: {
              'Authorization': `Bearer ${bearerToken}`
          }
      });
      axiosInstance
          .post('/api/v1/prescriptions/'+id+'/send')
          .then(response => {
              setState({
                  ...state,
                  errorDownload: false,
                  errorSend: false,
                  successSend: false,
                  errorDelete: false,
                  successDelete: false
              });
              if (response.data.success) {
                  let updatedSearchResults = state.searchResults.map(r => {
                      if (r.id === id) {
                          r.status = "Sent";
                      }
                      return r;
                  });
                  setState({
                      ...state,
                      errorDownload: false,
                      errorSend: false,
                      successSend: true,
                      searchResults: updatedSearchResults,
                      errorDelete: false,
                      successDelete: false
                  });
              }
          })
          .catch(error => {
              console.log("Error sending email: ", error);
              setState({
                  ...state,
                  errorDownload: false,
                  errorSend: true,
                  successSend: false,
                  errorDelete: false,
                  successDelete: false
              })
          });
  }

  const deletePrescription = (id) => {
      console.log("Delete prescription", id);
      const axiosInstance = axios.create({
          headers: {
              'Authorization': `Bearer ${bearerToken}`
          }
      });
      axiosInstance
          .delete('/api/v1/prescriptions/'+id)
          .then(response => {
              setState({
                  ...state,
                  errorDownload: false,
                  errorSend: false,
                  successSend: false,
                  errorDelete: false,
                  successDelete: false
              });
              if (response.data.success) {
                  let updatedSearchResults = state.searchResults.filter(r => {
                      return r.id !== id;
                  });
                  setState({
                      ...state,
                      errorDownload: false,
                      errorSend: false,
                      successSend: false,
                      searchResults: updatedSearchResults,
                      errorDelete: false,
                      successDelete: true
                  });
              }
          })
          .catch(error => {
              console.log("Error deleting prescription: ", error);
              setState({
                  ...state,
                  errorDownload: false,
                  errorSend: false,
                  successSend: false,
                  errorDelete: true,
                  successDelete: false
              })
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
              <h2>Prescriptions</h2>
              {!isEmptyObj(patient) &&
              <p>Manage prescriptions for {patient.firstname} {patient.lastname}</p>
              }
              {isEmptyObj(patient) &&
              <p>Loading prescriptions...</p>
              }
            </div>
            {!isEmptyObj(patient) &&
            <>
            <div className="row">
              <div className="col-12">
                <Link to={reverse(routes.doctor.prescriptions.search)} className="btn btn-secondary btn-sm"><i className="icofont-arrow-left"></i> Back</Link>
              </div>
            </div>

              <div className="row" style={{marginTop: "1em"}}>
              <div className="col-12">
              {state.errorDownload &&
                  <div className="alert alert-danger" role="alert">
                      Sorry, there was an error while downloading file from the server. Please try again later, or contact us if the problem persists.
                  </div>
              }
              {state.successSend &&
              <div className="alert alert-info" role="alert">
                  The prescription was sent to patient successfully.
              </div>
              }
              {state.errorSend &&
              <div className="alert alert-danger" role="alert">
                  Sorry, there was an error while sending prescription to the patient. Please try again later, or contact us if the problem persists.
              </div>
              }
              {state.successDelete &&
              <div className="alert alert-info" role="alert">
                  The prescription was deleted successfully.
              </div>
              }
              {state.errorDelete &&
              <div className="alert alert-danger" role="alert">
                  Sorry, there was an error while deleting the prescription. Please try again later, or contact us if the problem persists.
              </div>
              }
              {props.location.state && props.location.state.prescriptionCreatedSuccess &&
              <div className="alert alert-info" role="alert">
                  The defined prescription was created successfully.
              </div>
              }
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
              <th scope="col">Issued on</th>
              <th scope="col">Appointment date</th>
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
                          <SearchResultRow result={searchResult} index={index} downloadReport={downloadReport} sendReport={sendReport} deletePrescription={deletePrescription} />
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
          <td>{searchResult.issuedOn}</td>
        <td>{searchResult.appointmentDate}</td>
        <td>{searchResult.symptoms.join(", ")}</td>
        <td>{searchResult.status}</td>
        <td>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => {props.downloadReport(searchResult.id)}}>
          <i className="icofont-download"></i></button>
          {searchResult.status === "Pending" &&
          <>
            <button type="button" className="btn btn-secondary btn-sm" style={{marginLeft: '2%'}} onClick={() => {props.deletePrescription(searchResult.id)}}><i className="icofont-trash"></i></button>
            <button type="button" className="btn btn-secondary btn-sm" style={{marginLeft: '2%'}} onClick={() => {props.sendReport(searchResult.id)}}>Send</button>
          </>
          }
        </td>
      </tr>
  )
}