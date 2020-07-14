import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import routes from "../../routes";


export default function Questionnaire() {

    return(
        <main id="main">
            <div className="row" style={{marginTop: "3%"}}>
                <div className="col-6 offset-3">
                    <form>
                        <div className="form-group justify-content-center">
                            <label htmlFor="exampleFormControlSelect2">Choose one or more symptoms</label>
                            <select multiple className="form-control" id="exampleFormControlSelect2">
                                <option>Cough</option>
                                <option>Asthma</option>
                                <option>Mucus</option>
                                <option>Heavy Lungs</option>
                            </select>
                        </div>
                        {/*slider*/}
                        <label htmlFor="customRange3">How severe are your symptoms?</label>
                        <form class="range-field" style={{width: "100%"}}>
                            <input type="range" min="0" max="10" step="1" />
                        </form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Other</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </form>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex="-1">Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </main>
    );
}