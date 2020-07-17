import DashboardContext from "../../context/Dashboard/dashboardContext";
import React, {Fragment, useContext, useEffect} from "react";

// import { Link } from 'react-router-dom';
// import routes from "../../routes";


const QuestionNeumology = () => {

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
                        <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">When did you have your first symptom(s)?</label>
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                <option selected>Choose...</option>
                                <option value="2">2-5 days ago</option>
                                <option value="7">A week ago</option>
                                <option value="30">A month ago</option>
                                <option value="60">More than a month ago</option>
                            </select>
                        </div>
                        <div className="col-auto my-1" style={{marginTop: "3%"}}>
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">I have asthma... </label>
                            <div className="form-check">

                                <input className="form-check-input" type="checkbox" id="asthma1"/>
                                <label className="form-check-label" htmlFor="asthma1">
                                    When I do severe sport.
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="asthma2"/>
                                <label className="form-check-label" htmlFor="asthma2">
                                    When I do slight exercise.
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="asthma3"/>
                                <label className="form-check-label" htmlFor="asthma3">
                                    The environment is too humid.
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="asthma4"/>
                                <label className="form-check-label" htmlFor="asthma4">
                                    Always.
                                </label>
                            </div>
                        </div>
                        <div className="col-auto my-1" style={{marginTop: "3%"}}>
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">My cough is... </label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="cough1"/>
                                <label className="form-check-label" htmlFor="cough1">
                                    Dry.
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="cough2"/>
                                <label className="form-check-label" htmlFor="cough2">
                                    With mucus.
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="cough3"/>
                                <label className="form-check-label" htmlFor="cough3">
                                    Continuous.
                                </label>
                            </div>
                        </div>

export default Dashboard;