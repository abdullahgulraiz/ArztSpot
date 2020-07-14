import React, {useState, Component, useContext} from 'react';
import { Link } from 'react-router-dom';
import { reverse } from 'named-urls'
import routes from "../../../routes";
import axios from "axios";
import Cookies from "js-cookie";
import {AuthContext} from "../../../auth/AuthState";
import moment from "moment";

export const PrescriptionsSearch = (props) => {

  const initial_state = {
    query: '',
    criteria: 'firstname',
    search_results: [],
    errorMessage: '',
    statusMessage: '',
  }

  const [state, setState] = useState(initial_state);

  const { bearerToken } = useContext(AuthContext);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const search_query = {
      searchValue: state.query,
      searchCriteria: state.criteria,
    }
    const axiosInstance = axios.create({
      timeout: 1000,
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    });
    axiosInstance
        .post("/api/v1/doctors/mypatients", search_query)
        .then(response => {
          if (response.data.success) {
            let searchResults = [];
            response.data.data.map(r => {
              searchResults.push({
                patient_id: r._id,
                first_name: r.firstname,
                last_name: r.lastname,
                dob: moment(r.birthday).format("YYYY-MM-DD"),
                last_appointment: moment(r.lastAppointment).format("YYYY-MM-DD")
              });
            });
            setState({
              ...state,
              search_results: searchResults,
              statusMessage: `Search returned ${response.data.data.length} results.`,
              errorMessage: ''
            });
          } else {
            setState({ ...state, errorMessage: response.data.error, search_results: [], statusMessage: '' });
          }
        })
        .catch(error => {
          setState({ ...state, errorMessage: error.response.data.error, statusMessage: '', search_results: [] });
        });
  }

  return (

      <main id="main">

        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Prescriptions</h2>
              <p>Search for a Patient to browse their prescriptions.</p>
            </div>

            <div className="row">
              <div className="col-8 offset-2">
                {state.errorMessage !== "" &&
                <div className="alert alert-danger" role="alert">
                  {state.errorMessage}
                </div>
                }
                {state.statusMessage !== "" &&
                <div className="alert alert-info" role="alert">
                  {state.statusMessage}
                </div>
                }
                <h4>Search</h4>
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="query">Query</label>
                    <input type="text" className="form-control" id="query" name={"query"} placeholder="Query" onChange={onChange} required={"required"} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="criteria">Criteria</label>
                    <select id="criteria" className="form-control" name={"criteria"} onChange={onChange} required={"required"}>
                      <option value="firstname">First Name</option>
                      <option value="lastname">Last Name</option>
                      <option value="birthday">Date of Birth</option>
                    </select>
                  </div>
                  <div className="row" style={{marginTop: "3%"}}>
                    <div className="col-6 offset-3 text-center">
                      <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                  </div>
                </form>
                { state.search_results.length > 0 &&
                <div>
                  <br />
                  <label htmlFor="inputAddress2">Results</label>
                  <table className="table table-hover">
                    <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">DOB</th>
                      <th scope="col">Last appointment</th>
                      <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      state.search_results.map((search_result, index) => {
                        return (
                            <SearchResultRow result={search_result} index={index} />
                        );
                      })
                    }
                    </tbody>
                  </table>
                </div>
                }
              </div>
            </div>
          </div>
        </section>

      </main>

  );

}

const SearchResultRow = props => {
  const search_result = props.result;
  const index = props.index;
  return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{search_result.first_name}</td>
        <td>{search_result.last_name}</td>
        <td>{search_result.dob}</td>
        <td>{search_result.last_appointment}</td>
        <td>
          <Link to={{
            pathname: reverse(routes.doctor.prescriptions.patient, { patientId: search_result.patient_id })
          }} className={"btn btn-secondary btn-sm"}>View</Link>
        </td>
      </tr>
  )
}