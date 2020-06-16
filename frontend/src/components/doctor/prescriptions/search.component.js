import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reverse } from 'named-urls'
import routes from "../../../routes";

export default class PrescriptionsSearch extends Component {

  constructor(props) {
    super(props);

    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onChangeCriteria = this.onChangeCriteria.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
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
  }

  componentDidMount() {
    console.log(this.state);
    /*
    axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
              username: response.data[0].username
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
*/
  }

  onChangeQuery(e) {
    this.setState({
      query: e.target.value
    })
  }

  onChangeCriteria(e) {
    this.setState({
      criteria: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const search_query = {
      username: this.state.query,
      criteria: this.state.criteria,
    }
    console.log(search_query);
  }


  render() {
    return (

      <main id="main">

        <section id="contact" class="contact">
          <div class="container" data-aos="fade-up">

            <div class="section-title">
              <h2>Prescriptions</h2>
              <p>Search for a Patient to browse their prescriptions.</p>
            </div>

            <div className="row">
              <div className="col-8 offset-2">
                <h4>Search</h4>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="inputAddress1">Query</label>
                  <input type="text" className="form-control" id="inputAddress1" placeholder="Query" onChange={this.onChangeQuery} />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Criteria</label>
                  <select id="inputAddress" className="form-control" onChange={this.onChangeCriteria}>
                    <option selected value="first_name">First Name</option>
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
                { this.state.search_results.length > 0 &&
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
                    this.state.search_results.map((search_result, index) => {
                      return (
                          <tr>
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
}