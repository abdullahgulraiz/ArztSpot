import React, {Component, useContext, useEffect, useState} from 'react';
import {reverse} from "named-urls";
import routes from "../../../routes";
import {Link, Redirect} from "react-router-dom";
import {isEmptyObj} from "../../../utils/isEmptyObj";
import NotFound from "../../general/notfound.component";
import axios from "axios";
import {AuthContext} from "../../../context/auth/AuthState";
import moment from "moment";

export const PrescriptionsMainPatient = (props) => {

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

  const { bearerToken } = useContext(AuthContext);

  useEffect(() => {
    const axiosInstance = axios.create({
      timeout: 1000,
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    });
    axiosInstance
        .get("/api/v1/prescriptions/myprescriptions")
        .then(response => {
          if (response.data.success) {
              let search_results = [];
              response.data.data.map(d => {
                  search_results.push({
                      'id': d._id,
                      'appointmentDate': moment(d.appointment.startTime).format("YYYY-MM-DD"),
                      'issuedOn': moment(d.date).format("YYYY-MM-DD"),
                      'symptoms': d.appointment.symptoms && d.appointment.symptoms.length > 0 ? d.appointment.symptoms.map(s => s.name) : ["Not defined"],
                      'doctor': d.doctor,
                      'additionalMessage': d.additionalNotes,
                      'validity': d.validity
                  });
              });
              setState({...state, searchResults: search_results });
          } else {
            setState({ ...state, error404: true });
          }
        })
        .catch(error => {
          console.log("Error", error, error.response);
          setState({ ...state, error404: true, patient: {} });
        });
  }, []);

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
              console.log("Error generation PDF: ", error, error.response);
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
              <p>View prescriptions from all your appointments.</p>
            </div>

              <div className="row" style={{marginTop: "1em"}}>
              <div className="col-12">
              {state.errorDownload &&
                  <div className="alert alert-danger" role="alert">
                      Sorry, there was an error while downloading file from the server. Please try again later, or contact us if the problem persists.
                  </div>
              }
              <h4>Available Prescriptions</h4>
              <div>
              <table className="table table-hover">
              <thead>
              <tr>
              <th scope="col">#</th>
              <th scope="col">Appointment date</th>
              <th scope="col">Doctor</th>
              <th scope="col">Issued on</th>
              <th scope="col">Symptoms</th>
              <th scope="col">Validity</th>
              <th scope="col">Comments</th>
              <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              {state.searchResults.length > 0 &&
                state.searchResults
                    .map((searchResult, index) => {
                      return (
                          <SearchResultRow result={searchResult} index={index} downloadReport={downloadReport} />
                      );
                    })
              }
              {state.searchResults.length <= 0 &&
                <tr>
                  <td colSpan={8} className={"text-center"}>There are no Prescriptions available yet.</td>
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

const SearchResultRow = props => {
  const searchResult = props.result;
  const index = props.index;
  return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{searchResult.appointmentDate}</td>
        <td>{searchResult.doctor.firstname} {searchResult.doctor.lastname}</td>
        <td>{searchResult.issuedOn}</td>
        <td>{searchResult.symptoms.join(", ")}</td>
        <td>{searchResult.validity}</td>
        <td>{searchResult.additionalMessage ? searchResult.additionalMessage : "None"}</td>
        <td>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => {props.downloadReport(searchResult.id)}}>
          <i className="icofont-download"></i></button>
        </td>
      </tr>
  )
}