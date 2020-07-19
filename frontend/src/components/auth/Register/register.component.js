import React, { Fragment, useContext } from "react";
import routes from "../../../routes";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/auth/AuthState";
import TypeaheadSearch from "../../search/TypeaheadSearch";
import Alert from "../../dashboard/Alert";
import languages from "../../../data/languages";
import specialization from "../../../data/specialization";
import moment from "moment";
import {Link} from "react-router-dom";
const Register = () => {
  const authContext = useContext(AuthContext);
  const {
    alert,
    alertMsg,
    privatePractice,
    userToCreate,
    setUserToCreate,
    setPrivatePractice,
    customErrors,
    setCustomErrors,
    setHospitalToCreate,
    hospitalToCreate,
    createDoctor,
    createPatient,
    clearCustomError,
  } = authContext;
  const { register, handleSubmit, errors } = useForm();

  const onChange = (e) => {
    // this is to hide the info about the practice
    if (e.target.name === "role" && e.target.value === "user") {
      setPrivatePractice(false);
    }
    setUserToCreate({ ...userToCreate, [e.target.name]: e.target.value });
  };
  const onChangePracticeType = (e) => {
    setPrivatePractice(!privatePractice);
  };
  // fields related with hospital to create
  const onChangeHospital = (e) => {
    setHospitalToCreate({
      ...hospitalToCreate,
      [e.target.name]: e.target.value,
    });
  };
  const validateDate = (birthday) => {
    // check age is between 18 and 95
    console.log(
      moment().diff(moment(birthday), "years") >= 18 &&
      moment().diff(moment(birthday), "years") <= 95
    )
    return (
      moment().diff(moment(birthday), "years") >= 18 &&
      moment().diff(moment(birthday), "years") <= 95
    );
  };

  const onSubmit = (data) => {
    if (userToCreate.role === "doctor") {
      if (userToCreate.languages.length === 0) {
        setCustomErrors({ ...customErrors, errorLanguages: true });
      } else if (userToCreate.specialization === "") {
        setCustomErrors({ ...customErrors, errorSpecialization: true });
      } else {
        clearCustomError();
        createDoctor(userToCreate, hospitalToCreate, privatePractice);
      }
    } else {
      createPatient(userToCreate);
    }
  };

  return (
    <main id="main">
      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Sign Up</h2>
            <p>Please enter your details to create an account with ArztSpot.</p>
          </div>

          <form noValidate>
            <div className="row">
              <div className="col-6 offset-3">
                {alert && <Alert msg={alertMsg} />}
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputName4">Name</label>
                    <input
                      type={"text"}
                      onChange={onChange}
                      className={`form-control ${
                        errors.firstname && "is-invalid"
                      }`}
                      name="firstname"
                      ref={register({ required: true, minLength: 2 })}
                      id={"name"}
                      placeholder="First Name"

                    />
                    {errors.firstname &&
                      errors.firstname.type === "required" && (
                        <div
                          className={`pl-0 invalid-feedback d-inline col-md-6 `}
                        >
                          Firstname is required.
                        </div>
                      )}
                    {errors.firstname &&
                      errors.firstname.type === "minLength" && (
                        <div
                          className={`pl-0 invalid-feedback d-inline col-md-6 `}
                        >
                          Firstname must be longer than two characters.
                        </div>
                      )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputLastName4">Last Name</label>
                    <input
                      type={"text"}
                      onChange={onChange}
                      ref={register({ required: true, minLength: 2 })}
                      className={`form-control ${
                        errors.lastname && "is-invalid"
                      }`}
                      id={"lastname"}
                      placeholder={"Last Name"}
                      name={"lastname"}
                    />
                    {errors.lastname && errors.lastname.type === "required" && (
                      <div
                        className={`pl-0 invalid-feedback d-inline col-md-6 `}
                      >
                        Lastname is required.
                      </div>
                    )}
                    {errors.lastname &&
                      errors.lastname.type === "minLength" && (
                        <div
                          className={`pl-0 invalid-feedback d-inline col-md-6 `}
                        >
                          Lastname must be longer than two characters.
                        </div>
                      )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                      type={"text"}
                      onChange={onChange}
                      className={`form-control ${errors.email && "is-invalid"}`}
                      id={"email"}
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      })}
                      placeholder={"Email"}
                      name={"email"}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <div
                        className={`pl-0 invalid-feedback d-inline col-md-6 `}
                      >
                        Email is required.
                      </div>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <div
                        className={`pl-0 invalid-feedback d-inline col-md-6 `}
                      >
                        Introduce a valid email.
                      </div>
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Password</label>
                    <input
                      type={"password"}
                      onChange={onChange}
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/,
                          message:
                            "Password must have at least a letter a number and be longer than 6 characters",
                        },
                      })}
                      className={`form-control ${
                        errors.password && "is-invalid"
                      }`}
                      id={"password"}
                      placeholder={"Password"}
                      name={"password"}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <div
                        className={`pl-0 invalid-feedback d-inline col-md-6 `}
                      >
                        Password is required.
                      </div>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                      <div
                        className={`pl-0 invalid-feedback d-inline col-md-6 `}
                      >
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="form-check-label" id="inlineRadio1">
                      I am a Doctor
                    </label>
                    <input
                      className="form-check-input ml-3"
                      type="radio"
                      name="role"
                      value="doctor"
                      checked={userToCreate.role === "doctor"}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-check-label" id="inlineRadio1">
                      I am a Patient
                    </label>
                    <input
                      className="form-check-input ml-3"
                      type="radio"
                      name="role"
                      value="user"
                      checked={userToCreate.role === "user"}
                      onChange={onChange}
                    />
                  </div>
                </div>
                {userToCreate.role === "user" && (
                  <div className="" id="multiCollapse">
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="example-tel-input">Telephone</label>
                        <input
                          className={`form-control ${
                            errors.phone && "is-invalid"
                          }`}
                          name="phone"
                          onChange={onChange}
                          ref={register({
                            required: true,
                            pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{3}$/,
                          })}
                          placeholder="+XX (XXX) XXX-XXX"
                          id="example-tel-input"
                        />
                        {errors.phone && errors.phone.type === "required" && (
                          <div
                            className={`invalid-feedback d-inline inlinecol-sm-8 `}
                          >
                            Phone number is required.
                          </div>
                        )}
                        {errors.phone && errors.phone.type === "pattern" && (
                          <div
                            className={`invalid-feedback d-inline col-sm-8 `}
                          >
                            This format is required +XX (XXX) XXX-XXX.
                          </div>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputDate4">Date of Birthday</label>
                        <input
                          type={"date"}
                          onChange={onChange}
                          className={`form-control ${
                            errors.date && "is-invalid"
                          }`}
                          id="date"
                          ref={register({ validate: validateDate })}
                          placeholder={"DD.MM.YYYY"}
                          name="birthday"
                        />
                        {errors.birthday && errors.birthday.type === "validate" && (
                          <div
                            className={`pl-0 invalid-feedback d-inline col-sm-8 `}
                          >
                            Must be older than 18 years old (and less than 95).
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="inputAddress">Address</label>
                      <input
                        type="text"
                        onChange={onChange}
                        className={`form-control ${
                          errors.address && "is-invalid"
                        }`}
                        name="address"
                        ref={register({
                          required: true,
                          minLength: 10,
                          maxLength: 50,
                        })}
                        id="inputAddress"
                        placeholder="Leopoldstraße 45"
                      />
                      {errors.address && errors.address.type === "required" && (
                        <div
                          className={`pl-0 invalid-feedback d-inlined-inline d-inline d-inlined-inline  col-sm-8`}
                        >
                          Address is required.
                        </div>
                      )}
                      {errors.address &&
                        errors.address.type === "minLength" && (
                          <div
                            className={`pl-0 invalid-feedback d-inlined-inline d-inline d-inlined-inline  col-sm-8`}
                          >
                            Address must be longer than 10 characters
                          </div>
                        )}
                      {errors.address &&
                        errors.address.type === "maxLength" && (
                          <div
                            className={`pl-0 invalid-feedback d-inline col-sm-8 `}
                          >
                            Address cannot exceed 50 characters
                          </div>
                        )}
                    </div>
                    <div className="form-row">
                      <div className="form-group col-lg-6">
                        <label htmlFor="inputCity">Country</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.country && "is-invalid"
                          }`}
                          onChange={onChange}
                          name="country"
                          ref={register({
                            required: true,
                            minLength: 5,
                            maxLength: 20,
                          })}
                          id="Country"
                          placeholder={"Country"}
                        />
                        {errors.country &&
                          errors.country.type === "required" && (
                            <div
                              className={`invalid-feedback d-inline d-inline d-inline  col-sm-8 `}
                            >
                              Country is required.
                            </div>
                          )}
                        {errors.country &&
                          errors.country.type === "minLength" && (
                            <div
                              className={`invalid-feedback d-inline d-inline d-inline col-sm-8 `}
                            >
                              Country must be longer than 5 characters
                            </div>
                          )}
                        {errors.country &&
                          errors.country.type === "maxLength" && (
                            <div
                              className={`invalid-feedback d-inline col-sm-8 `}
                            >
                              Country cannot exceed 20 characters
                            </div>
                          )}
                      </div>
                      <div className="form-group col-lg-4">
                        <label htmlFor="inputState">City</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.city && "is-invalid"
                          }`}
                          onChange={onChange}
                          id="inputCity"
                          ref={register({
                            required: true,
                            minLength: 5,
                            maxLength: 20,
                          })}
                          name="city"
                          placeholder={"City"}
                        />
                        {errors.city && errors.city.type === "required" && (
                          <div
                            className={`invalid-feedback d-inline d-inline d-inline  col-sm-8 `}
                          >
                            City is required.
                          </div>
                        )}
                        {errors.city && errors.city.type === "minLength" && (
                          <div
                            className={`invalid-feedback d-inline d-inline d-inline col-sm-8 `}
                          >
                            City must be longer than 5 characters
                          </div>
                        )}
                        {errors.city && errors.city.type === "maxLength" && (
                          <div
                            className={`invalid-feedback d-inline col-sm-8 `}
                          >
                            City cannot exceed 50 characters
                          </div>
                        )}
                      </div>
                      <div className="form-group col-lg-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input
                          type="text"
                          onChange={onChange}
                          className={`form-control ${
                            errors.zipcode && "is-invalid"
                          }`}
                          name="zipcode"
                          ref={register({
                            required: true,
                            pattern: /^(?=(\D*\d){5}\D*$)/,
                          })}
                          id="inputZip"
                          placeholder={"80331"}
                        />
                        {errors.zipcode &&
                          errors.zipcode.type === "required" && (
                            <div
                              className={`invalid-feedback d-inline col-sm-8 `}
                            >
                              Zipcode is required.
                            </div>
                          )}
                        {errors.zipcode &&
                          errors.zipcode.type === "pattern" && (
                            <div
                              className={`invalid-feedback d-inline col-sm-8 `}
                            >
                              Zipcode must be 5 numbers.
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputInsurance">Insurance</label>
                        <select
                          id="inputInsurance"
                          name="insurance_company"
                          className="form-control"
                          onChange={onChange}
                        >
                          <option
                            defaultChecked={
                              userToCreate.insurance_company === "AOK"
                            }
                          >
                            AOK
                          </option>
                          <option
                            defaultChecked={
                              userToCreate.insurance_company === "GEK"
                            }
                          >
                            GEK
                          </option>
                          <option
                            defaultChecked={
                              userToCreate.insurance_company === "TK"
                            }
                          >
                            TK
                          </option>
                        </select>
                      </div>
                      <div className="form-group col-md-8">
                        <label htmlFor="inputCity">Insurance ID</label>
                        <input
                          type="text"
                          onChange={onChange}
                          className={`form-control ${
                            errors.insurance_number && "is-invalid"
                          }`}
                          name="insurance_number"
                          ref={register({
                            required: true,
                            pattern: /^(?=(\D*\d){9}\D*$)/,
                          })}
                          id="inputInsuranceID"
                          placeholder={"123456789"}
                        />
                      </div>
                    </div>
                    {errors.insurance_number &&
                      errors.insurance_number.type === "required" && (
                        <div
                          className={`invalid-feedback d-inline col-md-8 offset-md-4 offset-md-0`}
                        >
                          Insurance number is required.
                        </div>
                      )}
                    {errors.insurance_number &&
                      errors.insurance_number.type === "pattern" && (
                        <div
                          className={`invalid-feedback d-inline col-md-8 offset-md-4 offset-md-0`}
                        >
                          Insurance number must be 9 numbers.
                        </div>
                      )}
                  </div>
                )}
                {userToCreate.role === "doctor" && (
                  <Fragment>
                    <label htmlFor="inputPassword4">Languages you speak</label>
                    <TypeaheadSearch
                      props={{
                        data: languages,
                        multiple: true,
                        name: "languages",
                        setFunction: setUserToCreate,
                        state: userToCreate,
                        placeholder: "Language...",
                      }}
                    />{" "}
                    {customErrors.errorLanguages && (
                      <div
                        className={`pl-0 invalid-feedback d-inline col-md-8 offset-md-0`}
                      >
                        Languages is required
                      </div>
                    )}
                    <label htmlFor="inputPassword4">Specialization</label>
                    <TypeaheadSearch
                      props={{
                        data: specialization,
                        multiple: false,
                        name: "specialization",
                        setFunction: setUserToCreate,
                        state: userToCreate,
                        placeholder: "Specialization...",
                      }}
                    />
                    {customErrors.errorSpecialization && (
                      <div
                        className={`pl-0 invalid-feedback d-inline col-md-8 `}
                      >
                        Specialization is required
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        What's your experience?
                      </label>
                      <textarea
                        className={`form-control ${
                          errors.experience && "is-invalid"
                        }`}
                        name="experience"
                        onChange={onChange}
                        id="exampleFormControlTextarea1"
                        ref={register({
                          required: true,
                          minLength: 50,
                          maxLength: 1000,
                        })}
                        rows="3"
                      >
                        {userToCreate.experience}
                      </textarea>
                    </div>
                    {errors.experience &&
                      errors.experience.type === "required" && (
                        <div
                          className={`invalid-feedback d-inline d-inlined-inline col-sm-8`}
                        >
                          Experience is required.
                        </div>
                      )}
                    {errors.experience &&
                      errors.experience.type === "minLength" && (
                        <div
                          className={`invalid-feedback d-inline d-inlined-inline col-sm-8  `}
                        >
                          Experience must be longer than 50 characters
                        </div>
                      )}
                    {errors.experience &&
                      errors.experience.type === "maxLength" && (
                        <div className={`invalid-feedback d-inline col-sm-8 `}>
                          Experience cannot exceed 300 characters
                        </div>
                      )}
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="privatePractice"
                          value="true"
                          defaultChecked={privatePractice === "true"}
                          onChange={onChangePracticeType}
                        />
                        <label className="form-check-label" id="inlineRadio1">
                          I work on my own practice
                        </label>
                      </div>
                    </div>
                    {privatePractice && (
                      <Fragment>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputDate4">Practice Name</label>
                            <input
                              type={"text"}
                              onChange={onChangeHospital}
                              className={`form-control ${
                                errors.nameHospital && "is-invalid"
                              }`}
                              id={"date"}
                              ref={register({
                                required: true,
                                minLength: 5,
                              })}
                              placeholder="Dr. Smith Consultation"
                              name="nameHospital"
                            />
                            {errors.nameHospital &&
                              errors.nameHospital.type === "required" && (
                                <div
                                  className={`pl-0 invalid-feedback d-inline col-md-6 `}
                                >
                                  Consultation name is required.
                                </div>
                              )}
                            {errors.nameHospital &&
                              errors.nameHospital.type === "minLength" && (
                                <div
                                  className={`pl-0 invalid-feedback d-inline col-md-6 `}
                                >
                                  Consultation name must be longer than 5
                                  characters.
                                </div>
                              )}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="example-tel-input">Telephone</label>
                            <input
                              onChange={onChangeHospital}
                              className={`form-control ${
                                errors.phoneHospital && "is-invalid"
                              }`}
                              name="phoneHospital"
                              type="tel"
                              ref={register({
                                required: true,
                                pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{3}$/,
                              })}
                              placeholder="+XX (XXX) XXX-XXX"
                              id="example-tel-input"
                            />
                            {errors.phoneHospital &&
                              errors.phoneHospital.type === "required" && (
                                <div
                                  className={`invalid-feedback d-inlined-inline  col-sm-8 `}
                                >
                                  Phone number is required.
                                </div>
                              )}
                            {errors.phoneHospital &&
                              errors.phoneHospital.type === "pattern" && (
                                <div
                                  className={`invalid-feedback d-inline col-sm-8 `}
                                >
                                  This format is required +XX (XXX) XXX-XXX.
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="form-group mt-2">
                          <label htmlFor="inputAddress">Address</label>
                          <input
                            type="text"
                            className={`form-control ${
                              errors.addressHospital && "is-invalid"
                            }`}
                            onChange={onChangeHospital}
                            name="addressHospital"
                            ref={register({
                              required: true,
                              minLength: 10,
                              maxLength: 50,
                            })}
                            id="inputAddress"
                            placeholder="Leopoldstraße 45"
                          />
                          {errors.addressHospital &&
                            errors.addressHospital.type === "required" && (
                              <div
                                className={`pl-0 invalid-feedback d-inlined-inline d-inline d-inlined-inline  col-sm-8`}
                              >
                                Address is required.
                              </div>
                            )}
                          {errors.addressHospital &&
                            errors.addressHospital.type === "minLength" && (
                              <div
                                className={`pl-0 invalid-feedback d-inlined-inline d-inline d-inlined-inline  col-sm-8`}
                              >
                                Address must be longer than 10 characters
                              </div>
                            )}
                          {errors.addressHospital &&
                            errors.addressHospital.type === "maxLength" && (
                              <div
                                className={`pl-0 invalid-feedback d-inline col-sm-8 `}
                              >
                                Address cannot exceed 50 characters
                              </div>
                            )}
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-6">
                            <label htmlFor="inputCountry">Country</label>
                            <input
                              type="text"
                              onChange={onChangeHospital}
                              className={`form-control ${
                                errors.countryHospital && "is-invalid"
                              }`}
                              ref={register({
                                required: true,
                                minLength: 5,
                                maxLength: 20,
                              })}
                              id="inputCountry"
                              name="countryHospital"
                              placeholder={"Country"}
                            />
                            {errors.countryHospital &&
                              errors.countryHospital.type === "required" && (
                                <div
                                  className={`invalid-feedback d-inline d-inline d-inline  col-sm-8 `}
                                >
                                  Country is required.
                                </div>
                              )}
                            {errors.countryHospital &&
                              errors.countryHospital.type === "minLength" && (
                                <div
                                  className={`invalid-feedback d-inline d-inline d-inline col-sm-8 `}
                                >
                                  Country must be longer than 5 characters
                                </div>
                              )}
                            {errors.countryHospital &&
                              errors.countryHospital.type === "maxLength" && (
                                <div
                                  className={`invalid-feedback d-inline col-sm-8 `}
                                >
                                  Country cannot exceed 20 characters
                                </div>
                              )}
                          </div>
                          <div className="form-group col-lg-4">
                            <label htmlFor="inputState">City</label>
                            <input
                              type="text"
                              onChange={onChangeHospital}
                              className={`form-control ${
                                errors.cityHospital && "is-invalid"
                              }`}
                              name="cityHospital"
                              ref={register({
                                required: true,
                                minLength: 5,
                                maxLength: 20,
                              })}
                              id="inputCity"
                              placeholder={"City"}
                            />
                            {errors.cityHospital &&
                              errors.cityHospital.type === "required" && (
                                <div
                                  className={`invalid-feedback d-inline d-inline d-inline  col-sm-8 `}
                                >
                                  City is required.
                                </div>
                              )}
                            {errors.cityHospital &&
                              errors.cityHospital.type === "minLength" && (
                                <div
                                  className={`invalid-feedback d-inline d-inline d-inline col-sm-8 `}
                                >
                                  City must be longer than 5 characters
                                </div>
                              )}
                            {errors.cityHospital &&
                              errors.cityHospital.type === "maxLength" && (
                                <div
                                  className={`invalid-feedback d-inline col-sm-8 `}
                                >
                                  City cannot exceed 20 characters
                                </div>
                              )}
                          </div>
                          <div className="form-group col-lg-2">
                            <label htmlFor="inputZip">Zip</label>
                            <input
                              type="text"
                              onChange={onChangeHospital}
                              className={`form-control ${
                                errors.zipcodeHospital && "is-invalid"
                              }`}
                              name="zipcodeHospital"
                              ref={register({
                                required: true,
                                pattern: /^(?=(\D*\d){5}\D*$)/,
                              })}
                              id="inputZip"
                              placeholder={"80331"}
                            />
                            {errors.zipcodeHospital &&
                              errors.zipcodeHospital.type === "required" && (
                                <div
                                  className={`invalid-feedback d-inline col-sm-8 `}
                                >
                                  Zipcode is required.
                                </div>
                              )}
                            {errors.zipcodeHospital &&
                              errors.zipcodeHospital.type === "pattern" && (
                                <div
                                  className={`invalid-feedback d-inline col-sm-8 `}
                                >
                                  Zipcode must be 5 numbers.
                                </div>
                              )}
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </Fragment>
                )}
                <div className="row" style={{ marginTop: "6%" }}>
                  <div className="col-6 offset-3 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Sign up
                    </button>
                    <div className="section-title" style={{ marginTop: "6%" }}>
                      <p>
                        Already signed up? <Link to={routes.auth.login} className="alert-link">Log in</Link>{" "}
                        with your account
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
export default Register;
