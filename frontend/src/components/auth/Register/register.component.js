import React, { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/auth/AuthState";
import TypeaheadSearch from "../../search/TypeaheadSearch";
import languages from "../../../data/languages";
import specialization from "../../../data/specialization";
import moment from "moment";
const Register = () => {
  const authContext = useContext(AuthContext);
  const {
    user,
    privatePractice,
    userToCreate,
    setUserToCreate,
    setPrivatePractice,
    customErrors,
    setCustomErrors,
    setHospitalToCreate,
    hospitalToCreate,
    createHospital,
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

          <form>
            <div className="row">
              <div className="col-6 offset-3">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputName4">Name</label>
                    <input
                      type={"text"}
                      onChange={onChange}
                      className={`form-control ${
                        errors.firstname && "is-invalid"
                      }`}
                      ref={register({ required: true, minLength: 2 })}
                      id={"name"}
                      placeholder="Firstname"
                      name="firstname"
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
                          value={userToCreate.phone}
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
                        {errors.date && errors.date.type === "validate" && (
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
                        value={userToCreate.address}
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
                          value={userToCreate.country}
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
                          value={userToCreate.city}
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
                          value={userToCreate.zipcode}
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
                          value={userToCreate.insurance_number}
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
                        value={userToCreate.experience}
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
                              value={hospitalToCreate.nameHospital}
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
                              value={hospitalToCreate.phoneHospital}
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
                            value={hospitalToCreate.addressHospital}
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
                              value={hospitalToCreate.countryHospital}
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
                              value={hospitalToCreate.cityHospital}
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
                              value={hospitalToCreate.zipcodeHospital}
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

                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck2"
                    />
                    <label className="form-check-label" htmlFor="gridCheck2">
                      I agree to ArztSpot's{" "}
                      <a
                        className="alert-link"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                      >
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a
                        className="alert-link"
                        data-toggle="modal"
                        data-target="#exampleModalLong2"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
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
                        Already signed up? <a className="alert-link">Log in</a>{" "}
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

      <div
        className="modal fade"
        id="exampleModalLong"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Terms of Use
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5>1. Use of Our Service</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <h5>2. ArztSpot Accounts</h5>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <h5>3. Service Rules </h5>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
              <h6>3.1 General</h6>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore
                magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
                quis nostrum exercitationem ullam corporis suscipit laboriosam,
                nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                iure reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur.
              </p>
              <h6>3.2 Anti-distrimination</h6>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus.
              </p>
              <h5>4. User Content</h5>
              <p>
                Temporibus autem quibusdam et aut officiis debitis aut rerum
                necessitatibus saepe eveniet ut et voluptates repudiandae sint
                et molestiae non recusandae.
              </p>
              <h5>5. Our Proprietary Rights</h5>
              <p>
                Itaque earum rerum hic tenetur a sapiente delectus, ut aut
                reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
              </p>
              <h5>6. License Types</h5>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore
                magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
                quis nostrum exercitationem ullam corporis suscipit laboriosam.
              </p>

              <h5>Billing Policies</h5>
              <p>
                Sed et nisi at quam ullamcorper placerat in ac sem. Pellentesque
                pellentesque blandit venenatis. Proin nec nunc viverra,
                fringilla magna in, tincidunt ipsum. Ut magna quam, pretium vel
                mauris et, tincidunt condimentum leo. Interdum et malesuada
                fames ac ante ipsum primis in faucibus. Duis elementum diam
                eros, cursus aliquet mauris tincidunt sed. Aenean feugiat
                dignissim justo, a congue lectus viverra id. Fusce sodales
                fringilla mi vel dignissim.
              </p>

              <p>
                Curabitur vitae feugiat velit. Integer commodo, turpis eleifend
                hendrerit faucibus, justo justo accumsan est, a eleifend risus
                metus et leo. Duis aliquam fringilla nisl, at dapibus velit
                placerat sed. In nec sodales magna. Vestibulum libero dui,
                sollicitudin ut feugiat ac, ullamcorper quis ligula. Morbi at
                commodo nibh. Fusce dapibus mollis eleifend. Fusce et finibus
                leo. Integer gravida arcu et ex feugiat, at convallis sem
                varius. Donec hendrerit, risus nec lacinia viverra, massa leo
                dictum ante, ut elementum enim velit ac diam.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModalLong2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Privacy Policy
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5>1. Information we collect and its use</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <h6>(a) Information you provide us directly</h6>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <h6>(b) Information we receive from third parties </h6>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
              <h6>(c) Information we collect from you automatically</h6>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore
                magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
                quis nostrum exercitationem ullam corporis suscipit laboriosam,
                nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                iure reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur.
              </p>
              <h6>
                (d) Cookies information and information taken from similar
                technologies
              </h6>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus.
              </p>
              <h6>(e) Log file information</h6>
              <p>
                Temporibus autem quibusdam et aut officiis debitis aut rerum
                necessitatibus saepe eveniet ut et voluptates repudiandae sint
                et molestiae non recusandae.
              </p>
              <h6>(f) Device identifier</h6>
              <p>
                Itaque earum rerum hic tenetur a sapiente delectus, ut aut
                reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
              </p>
              <h6>(g) Location data </h6>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                non numquam eius modi tempora incidunt ut labore et dolore
                magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
                quis nostrum exercitationem ullam corporis suscipit laboriosam.
              </p>

              <h5>2. How we use your information</h5>
              <p>
                Sed et nisi at quam ullamcorper placerat in ac sem. Pellentesque
                pellentesque blandit venenatis. Proin nec nunc viverra,
                fringilla magna in, tincidunt ipsum. Ut magna quam, pretium vel
                mauris et, tincidunt condimentum leo. Interdum et malesuada
                fames ac ante ipsum primis in faucibus. Duis elementum diam
                eros, cursus aliquet mauris tincidunt sed. Aenean feugiat
                dignissim justo, a congue lectus viverra id. Fusce sodales
                fringilla mi vel dignissim.
              </p>

              <p>
                Curabitur vitae feugiat velit. Integer commodo, turpis eleifend
                hendrerit faucibus, justo justo accumsan est, a eleifend risus
                metus et leo. Duis aliquam fringilla nisl, at dapibus velit
                placerat sed. In nec sodales magna. Vestibulum libero dui,
                sollicitudin ut feugiat ac, ullamcorper quis ligula. Morbi at
                commodo nibh. Fusce dapibus mollis eleifend. Fusce et finibus
                leo. Integer gravida arcu et ex feugiat, at convallis sem
                varius. Donec hendrerit, risus nec lacinia viverra, massa leo
                dictum ante, ut elementum enim velit ac diam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Register;
