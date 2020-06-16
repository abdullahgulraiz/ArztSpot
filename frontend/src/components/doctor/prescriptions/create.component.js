import React, { Component } from 'react';

export default class PrescriptionsCreate extends Component {

  render() {
    return (

      <main id="main">

        <section id="contact" class="contact">
          <div class="container" data-aos="fade-up">

            <div class="section-title">
              <h2>Prescriptions</h2>
              <p>Create a new prescription for Mr. ABC.</p>
            </div>

            <div className="row">
              <div className="col-12">
                <button className="btn btn-secondary btn-sm"><i className="icofont-arrow-left"></i> Back</button>
              </div>
            </div>

            <div className="row" style={{marginTop: "1em"}}>
              <div className="col-5">
                <h4>Search</h4>
                <div className="form-group">
                  <label htmlFor="inputAddress1">Medicine Directory</label>
                  <input type="text" className="form-control" id="inputAddress1" placeholder="1234 Main St" />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Or, select from previous prescriptions</label>
                  <select id="inputAddress" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <br />
                <label htmlFor="inputAddress2">Search results</label>
                <table className="table table-hover">
                  <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td className="text-center">
                      <button type="button" className="btn btn-secondary btn-sm"><i className="icofont-ui-add"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td className="text-center">
                      <button type="button" className="btn btn-secondary btn-sm"><i className="icofont-ui-add"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry the Bird</td>
                    <td>@fat</td>
                    <td className="text-center">
                      <button type="button" className="btn btn-secondary btn-sm"><i className="icofont-ui-add"></i></button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-7">
                <h4>Prescription</h4>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Fee type</label>
                    <select id="inputState" className="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Validity</label>
                    <select id="inputState" className="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
                <div>
                  <table className="table table-hover">
                    <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Recurrence</th>
                      <th scope="col">Until</th>
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
                      <td className="text-center">
                        <button type="button" className="btn btn-secondary btn-sm"><i className="icofont-trash"></i></button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>Thornton</td>
                      <td className="text-center">
                        <button type="button" className="btn btn-secondary btn-sm"><i className="icofont-trash"></i></button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td className="text-center">
                        <button type="button" className="btn btn-secondary btn-sm"><i className="icofont-trash"></i></button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress13">Additional Notes for Patient</label>
                  <textarea className="form-control" id="inputAddress13" placeholder="Additional Notes" />
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: "3%"}}>
              <div className="col-6 offset-3 text-center">
                <button type="submit" className="btn btn-secondary">Save for later</button>&nbsp;&nbsp;
                <button type="submit" className="btn btn-primary">Send to Patient</button>
              </div>
            </div>
          </div>
        </section>

      </main>

    );
  }
}