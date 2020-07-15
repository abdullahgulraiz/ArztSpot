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
                            <h5>In order to finalise your booking, please answer the following questions.</h5>
                            <p>This will take only a few minutes.</p>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck1" aria-required={true}/>
                                <label className="form-check-label" htmlFor="gridCheck1" aria-required={true}>
                                    I had fever during the last week.
                                </label>
                            </div>
                        </div>
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
                        <form class="range-field">
                            <input type="range" min="0" max="10" step="1" style={{width: "100%"}}/>
                        </form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Other</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </form>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck2" data-toggle="collapse" href="#multiCollapse" role="button" aria-expanded="true" aria-controls="multiCollapse"/>
                            <label className="form-check-label" htmlFor="gridCheck2" data-toggle="collapse" href="#multiCollapse" role="button" aria-expanded="true" aria-controls="multiCollapse">
                                I want to give my results for a particular test.
                            </label>
                        </div>
                    </div>
                    <div className="collapse multi-collapse" id="multiCollapse">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile"/>
                            <label className="custom-file-label" htmlFor="customFile">Choose file...</label>
                        </div>
                    </div>
                    <nav aria-label="Page navigation" style={{marginTop: "3%"}}>
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex="-1">Previous</a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="/questionnaire">1</a></li>
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