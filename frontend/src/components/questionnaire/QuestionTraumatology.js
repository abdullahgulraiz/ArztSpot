import DashboardContext from "../../context/Dashboard/dashboardContext";
import React, {Fragment, useContext, useEffect} from "react";
// import { Link } from 'react-router-dom';
// import routes from "../../routes";

const QuestionTraumatology = () => {

    return (
        <main id="main">
            <div className="row" style={{marginTop: "3%"}}>
                <div className="col-6 offset-3">
                    <form>
                        <div className="col-auto my-1" style={{marginTop: "3%"}}>
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Cause of the visit: </label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="trauma1"/>
                                <label className="form-check-label" htmlFor="trauma1">
                                    I had an accident.
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="trauma2"/>
                                <label className="form-check-label" htmlFor="trauma2">
                                    Pain.
                                </label>
                            </div>
                        </div>

                        <div className="form-group justify-content-center">
                            <label htmlFor="exampleFormControlSelect2">Where do you feel the pain?</label>
                            <select multiple className="form-control" id="exampleFormControlSelect2">
                                <option>Neck</option>
                                <option>Arm(s)</option>
                                <option>Wrist</option>
                                <option>Back</option>
                                <option>Hip</option>
                                <option>Leg(s)</option>
                                <option>Ankle</option>
                                <option>Foot/feet</option>
                                <option>Other(s)</option>
                            </select>
                        </div>
                        <label htmlFor="customRange3">How intense is the pain that you feel?</label>
                        <form className="range-field">
                            <input type="range" min="0" max="10" step="1" style={{width: "100%"}}/>
                        </form>

                        <div className="form-group justify-content-center">
                            <label htmlFor="exampleFormControlSelect2">It hurts when I do...</label>
                            <div className="form-check">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="customRadioInline1" name="customRadioInline"
                                           className="custom-control-input"/>
                                    <label className="custom-control-label" htmlFor="customRadioInline1">This.</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="customRadioInline2" name="customRadioInline"
                                           className="custom-control-input"/>
                                    <label className="custom-control-label" htmlFor="customRadioInline2">This.</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="customRadioInline3" name="customRadioInline"
                                           className="custom-control-input"/>
                                    <label className="custom-control-label" htmlFor="customRadioInline3">Or
                                        this.</label>
                                </div>
                            </div>
                        </div>
                    </form>

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
export default QuestionTraumatology;