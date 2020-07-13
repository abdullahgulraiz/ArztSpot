import React, {useEffect, useState} from 'react';
import {isEmptyObj} from "../../../utils/isEmptyObj";
import NotFound from "../../general/notfound.component";
import DatePicker from "react-datepicker";
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";
import {reverse} from "named-urls";
import routes from "../../../routes";
import {Link} from "react-router-dom";

export const PrescriptionsCreate = (props) => {

  const initial_state = {
    patient: {},
    error404: false,
    search: {
      searchTerm: '',
      selectedPrescription: 'none',
      criteria: 0, //0 for search term, 1 for prescriptions
      allPrescriptions: [
        {id: 1, issuedOn: "July 12, 2020", symptoms: ["Body pain", "Cough", "Fever"]},
        {id: 2, issuedOn: "July 10, 2019", symptoms: ["Asthma", "COPD", "Headache"]}
      ],
      searchResults: [
        // {
        //   'name': 'Medicine 1',
        //   'manufacturer': 'GSK',
        // },
        // {
        //   'name': 'Medicine 2',
        //   'manufacturer': 'AB Pharma',
        // },
        // {
        //   'name': 'Medicine 3',
        //   'manufacturer': 'ABC Pharmaceuticals',
        // }
      ]
    },
    prescription: {
      selectedFeeType: 'none',
      allFeeTypes: [
        {id: 1, name: 'Public Insurance'},
        {id: 2, name: 'Private Insurance'},
        {id: 3, name: 'Self-paid'},
      ],
      selectedValidity: 'none',
      allValidities: [
        {id: 1, name: '1 day'},
        {id: 2, name: '3 days'},
        {id: 3, name: '7 days'},
        {id: 4, name: '15 days'},
      ],
      medicationData: [
        {
          name: 'Medicine 3',
          quantity: 1,
          recurrenceNum: 1,
          recurrenceType: "Daily",
          until: "2020-12-20"
        },
        {
          name: 'Medicine 4',
          quantity: 5,
          recurrenceNum: 6,
          recurrenceType: "Weekly",
          until: "2020-12-21"
        }
      ],
      additionalNotes: ''
    }
  }

  const [state, setState] = useState(initial_state);

  useEffect(() => {
    console.log("Patient ID", props.match.params.patientId);
    setTimeout(() => {
      setState({
        ...state,
        patient: {
          name: "John Smith"
        }
      });
    }, 0)
  }, []);

  const onChangeSearch = (e) => {
    if (e.target.name === "searchTerm") {
      setState({
        ...state,
        search: {
          ...state.search,
          searchTerm: e.target.value,
          selectedPrescription: 'none',
          criteria: 0
        }
      });
    } else {
      setState({
        ...state,
        search: {
          ...state.search,
          searchTerm: '',
          selectedPrescription: e.target.value,
          criteria: 1
        }
      });
    }
  }

  const onChangePrescription = (e) => {
    setState({
      ...state,
      prescription: {
        ...state.prescription,
        [e.target.name]: e.target.value,
      }
    });
  }

  const onChangeMedicationData = (e) => {
    const key = e.target.getAttribute('data-key');
    let mDsAll = state.prescription.medicationData;
    mDsAll[key] = {
      ...mDsAll[key],
      [e.target.name]: e.target.value,
    }
    setState({
      ...state,
      prescription: {
        ...state.prescription,
        medicationData: mDsAll,
      }
    });
  }

  const onChangeMedicationDataDatePicker = (key, date) => {
    let mDsAll = state.prescription.medicationData;
    mDsAll[key] = {
      ...mDsAll[key],
      until: moment(date).format("YYYY-MM-DD"),
    }
    setState({
      ...state,
      prescription: {
        ...state.prescription,
        medicationData: mDsAll,
      }
    });
  }

  const DeleteMedicationDataItem = (key) => {
    let mDsAll = state.prescription.medicationData;
    mDsAll = mDsAll.filter((mD, idx) => {
      return idx !== key;
    })
    setState({
      ...state,
      prescription: {
        ...state.prescription,
        medicationData: mDsAll,
      }
    });
  }

  const AddSearchDataItem = (key) => {
    let searchResult = state.search.searchResults[key];
    let mDsAll = state.prescription.medicationData;
    mDsAll.push({
      name: searchResult.name + " (" + searchResult.manufacturer + ")",
      quantity: 0,
      recurrenceNum: 0,
      recurrenceType: "Daily",
      until: moment().format("YYYY-MM-DD")
    });
    setState({
      ...state,
      prescription: {
        ...state.prescription,
        medicationData: mDsAll,
      }
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
              {!isEmptyObj(state.patient) &&
              <p>Create a new prescription for {state.patient.name}</p>
              }
              {isEmptyObj(state.patient) &&
              <p>Loading...</p>
              }
            </div>
            {!isEmptyObj(state.patient) &&
            <>
            <div className="row">
              <div className="col-12">
                <Link to={reverse(routes.doctor.prescriptions.patient, { patientId: props.match.params.patientId })} className="btn btn-secondary btn-sm"><i className="icofont-arrow-left"></i> Back</Link>
              </div>
            </div>
              <div className="row" style={{marginTop: "1em"}}>
              <div className="col-5">
              <h4>Search</h4>
              <div className="form-group">
              <label htmlFor="searchTerm">Medicine Directory</label>
              <input type="text" className="form-control" name={"searchTerm"} id={"searchTerm"} onChange={onChangeSearch} value={state.search.searchTerm} placeholder={"Query"} />
              </div>
              <div className="form-group">
              <label htmlFor="selectedPrescription">Or, select from previous prescriptions</label>
              <select id="selectedPrescription" className="form-control" name={"selectedPrescription"} value={state.search.selectedPrescription} onChange={onChangeSearch}>
                <option value={"none"} disabled={"disabled"}>Choose...</option>
                {
                  state.search.allPrescriptions.map((p, idx) => {
                    return (
                      <option key={idx} value={p.id}>{p.issuedOn} ({p.symptoms.join(", ")})</option>
                    )
                  })
                }
              </select>
              </div>
              <p className={"text-center"}>
                <button type={"button"} className="btn btn-secondary btn-sm"><i className="icofont-ui-search"></i> Search</button>
              </p>
              <label>Search results</label>
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
              {state.search.searchResults.length > 0 &&
                state.search.searchResults.map((sr, idx) => {
                  return (
                      <tr key={idx}>
                        <th scope="row">{idx + 1}</th>
                        <td>{sr.name}</td>
                        <td>{sr.manufacturer}</td>
                        <td className="text-center">
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => {AddSearchDataItem(idx)}}><i className="icofont-ui-add"></i></button>
                        </td>
                      </tr>
                  )
                })
              }
              {state.search.searchResults.length <= 0 &&
                <tr>
                <td className={"text-center"} colSpan={4}>No items here.<br/><span style={{fontSize: "12px"}}>Search results after you click <i className="icofont-ui-search"></i> will appear here.</span></td>
                </tr>
              }
              </tbody>
              </table>
              </div>
              <div className="col-7">
              <h4>Prescription</h4>
              <div className="form-row">
              <div className="form-group col-md-6">
              <label htmlFor="selectedFeeType">Fee type</label>
              <select id="selectedFeeType" className="form-control" name={"selectedFeeType"} defaultValue={state.prescription.selectedFeeType} onChange={onChangePrescription}>
              <option value={"none"} disabled={"disabled"}>Choose...</option>
                {
                  state.prescription.allFeeTypes.map((f, idx) => {
                    return (
                        <option key={idx} value={f.id}>{f.name}</option>
                    )
                  })
                }
              </select>
              </div>
              <div className="form-group col-md-6">
              <label htmlFor="selectedValidity">Validity</label>
              <select id="selectedValidity" className="form-control" name={"selectedValidity"} defaultValue={state.prescription.selectedValidity} onChange={onChangePrescription}>
                <option value={"none"} disabled={"disabled"}>Choose...</option>
                {
                  state.prescription.allValidities.map((v, idx) => {
                    return (
                        <option key={idx} value={v.id}>{v.name}</option>
                    )
                  })
                }
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
              {state.prescription.medicationData.length > 0 &&
                state.prescription.medicationData.map((d, idx) => {
                  return (
                      <tr key={idx}>
                        <th scope="row">{idx + 1}</th>
                        <td>{d.name}</td>
                        <td>
                          <input type={"number"} name={"quantity"} data-key={idx} className={"form-control"} value={d.quantity} step={0.1} onChange={onChangeMedicationData} min={0}/>
                        </td>
                        <td>
                          <input type={"number"} name={"recurrenceNum"} data-key={idx} className={"form-control"} value={d.recurrenceNum} step={0.1} onChange={onChangeMedicationData} min={0}/>
                          <select className="form-control" data-key={idx} name={"recurrenceType"} defaultValue={d.recurrenceType} onChange={onChangeMedicationData}>
                            <option value={"Daily"}>Daily</option>
                            <option value={"Weekly"}>Weekly</option>
                            <option value={"Fortnightly"}>Fortnightly</option>
                            <option value={"Monthly"}>Monthly</option>
                            <option value={"Yearly"}>Yearly</option>
                          </select>
                        </td>
                        <td>
                          <DatePicker
                              selected={new Date(d.until)}
                              onChange={date => {
                                onChangeMedicationDataDatePicker(idx, date);
                              }}
                          />
                        </td>
                        <td className="text-center">
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => {DeleteMedicationDataItem(idx)}}><i className="icofont-trash"></i></button>
                        </td>
                      </tr>
                  )
                })
              }
              {state.prescription.medicationData.length <= 0 &&
                <tr>
                  <td className={"text-center"} colSpan={6}>No items here.<br/><span style={{fontSize: "12px"}}>To add an item, click <i className="icofont-ui-add"></i> for any searched medicine.</span></td>
                </tr>
              }
              </tbody>
              </table>
              </div>
              <div className="form-group">
              <label htmlFor="additionalNotes">Additional Notes for Patient</label>
              <textarea className="form-control" id="additionalNotes" name={"additionalNotes"} placeholder="Additional Notes" onChange={onChangePrescription} />
              </div>
              </div>
              </div>
              <div className="row" style={{marginTop: "3%"}}>
              <div className="col-6 offset-3 text-center">
              <button type="submit" className="btn btn-secondary">Save for later</button>&nbsp;&nbsp;
              <button type="submit" className="btn btn-primary">Send to Patient</button>
              </div>
              </div>
            </>
            }
          </div>
        </section>

      </main>

    );
}