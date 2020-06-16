import React, { Component } from 'react';
import {reverse} from "named-urls";
import routes from "../../../routes";
import {Link} from "react-router-dom";

export default class PrescriptionsPatient extends Component {

  render() {
    return (

      <main id="main">

        <section id="contact" class="contact">
          <div class="container" data-aos="fade-up">

            <div class="section-title">
              <h2>Prescriptions</h2>
              <p>Manage prescriptions for Mr. ABC.</p>
            </div>

            <div className="row">
              <div className="col-12">
                <button className="btn btn-secondary btn-sm"><i className="icofont-arrow-left"></i> Back</button>
              </div>
            </div>

            <div className="row" style={{marginTop: "1em"}}>
              <div className="col-12">
                <h4>Patient Record</h4>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">Show</label>
                    <select id="inputState" className="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3 offset-5 text-right">
                    <Link to={{
                      pathname: reverse(routes.doctor.prescriptions.create, { patientId: 1 })
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
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>@fat</td>
                    </tr>
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
}