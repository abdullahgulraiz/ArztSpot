import React, {useState, Component, useContext} from 'react';
import { Link } from 'react-router-dom';
import { reverse } from 'named-urls'
import routes from "../../../routes";
import {AuthContext} from "../../../auth/AuthState";

export const PrescriptionsSearch = (props) => {

  const initial_state = {
    query: '',
    criteria: 'first_name',
    search_results: [
      {
        'patient_id': '12345deasds',
        'first_name': "ABC",
        'last_name': "CDE",
        'dob': "12-04-1998",
        'last_appointment': "15-06-2020"
      },
      {
        'patient_id': '12345deaasdasdgs',
        'first_name': "FGH",
        'last_name': "GHI",
        'dob': "13-06-1994",
        'last_appointment': "15-05-2020"
      }
    ]
  }

  const [state, setState] = useState(initial_state);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const search_query = {
      query: state.query,
      criteria: state.criteria,
    }
    console.log(search_query);
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
                <h4>Search</h4>
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="inputAddress1">Query</label>
                    <input type="text" className="form-control" id="inputAddress1" name={"query"} placeholder="Query" onChange={onChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputAddress">Criteria</label>
                    <select id="inputAddress" className="form-control" name={"criteria"} onChange={onChange}>
                      <option value="first_name">First Name</option>
                      <option value="last_name">Last Name</option>
                      <option value="dob">Date of Birth</option>
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