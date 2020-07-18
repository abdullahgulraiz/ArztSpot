import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth/AuthState";
import { useForm } from "react-hook-form";

const EditPersonalInfo = ({ user }) => {
  const authContext = useContext(AuthContext);
  const { setUpdateInfo, infoToUpdate, updateUser, bearerToken } = authContext;
  const { register, handleSubmit, errors } = useForm();
  useEffect(() => {
    setUpdateInfo(user);
  }, []);
  const onChange = (e) => {
    setUpdateInfo({ ...infoToUpdate, [e.target.name]: e.target.value });
  };
  const onSubmit = (data) => {
    updateUser(bearerToken, infoToUpdate);
  };
  return (
    <Fragment>
      <form>
        <div className="form-group row">
          <label htmlFor="inputFirstName" className="col-sm-4 col-form-label">
            Firstname
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className={`form-control ${errors.firstname && "is-invalid"}`}
              placeholder="Name"
              name="firstname"
              onChange={onChange}
              ref={register({ required: true, minLength: 2 })}
              value={infoToUpdate.firstname}
            />
          </div>
          {errors.firstname && errors.firstname.type === "required" && (
            <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
              Firstname is required.
            </div>
          )}
          {errors.firstname && errors.firstname.type === "minLength" && (
            <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
              Firstname must be longer than two characters.
            </div>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="inputLastName" className="col-sm-4 col-form-label">
            Lastname
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className={`form-control ${errors.lastname && "is-invalid"}`}
              id="lastname"
              placeholder="Lastname"
              name="lastname"
              ref={register({ required: true, minLength: 2 })}
              onChange={onChange}
              value={infoToUpdate.lastname}
            />
          </div>
          {errors.lastname && errors.lastname.type === "required" && (
            <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
              Lastname is required.
            </div>
          )}
          {errors.lastname && errors.lastname.type === "minLength" && (
            <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
              Lastname must be longer than two characters.
            </div>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
            Email
          </label>
          <div className="col-sm-8">
            <input
              type="email"
              className={`form-control ${errors.email && "is-invalid"}`}
              id="inputEmail3"
              placeholder="Email"
              name="email"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              onChange={onChange}
              value={infoToUpdate.email}
              required
            />
          </div>
          {errors.email && errors.email.type === "required" && (
            <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
              Email is required.
            </div>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
              Introduce a valid email.
            </div>
          )}
        </div>
        {user.role === "doctor" && (
          <Fragment>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Description</label>
              <textarea
                className={`form-control ${errors.experience && "is-invalid"}`}
                name="experience"
                onChange={onChange}
                id="exampleFormControlTextarea1"
                ref={register({
                  required: true,
                  minLength: 50,
                  maxLength: 1000,
                })}
                value={infoToUpdate.experience}
                rows="3"
              >
                {infoToUpdate.experience}
              </textarea>
            </div>
            {errors.experience && errors.experience.type === "required" && (
              <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
                Experience is required.
              </div>
            )}
            {errors.experience && errors.experience.type === "minLength" && (
              <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
                Experience must be longer than 50 characters
              </div>
            )}
            {errors.experience && errors.experience.type === "maxLength" && (
              <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
                Experience cannot exceed 300 characters
              </div>
            )}
          </Fragment>
        )}
        {user.role === "user" && (
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-4 pt-0">Radios</legend>
              <div className="col-sm-8">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="gridRadios1"
                    value="AOK"
                    onChange={onChange}
                    name="insurance_company"
                    checked={infoToUpdate.insurance_company === "AOK"}
                  />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    AOK
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="insurance_company"
                    id="gridRadios2"
                    onChange={onChange}
                    checked={infoToUpdate.insurance_company === "GEK"}
                    value="GEK"
                  />
                  <label className="form-check-label" htmlFor="gridRadios2">
                    GEK
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="insurance_company"
                    id="gridRadios3"
                    onChange={onChange}
                    checked={infoToUpdate.insurance_company === "TK"}
                    value="TK"
                  />
                  <label className="form-check-label" htmlFor="gridRadios3">
                    TK
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        )}
        {user.role === "user" && (
          <Fragment>
            <div className="form-group row">
              <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
                Insurance Number
              </label>
              <div className="col-sm-8">
                <input
                  className={`form-control ${
                    errors.insurance_number && "is-invalid"
                  }`}
                  id="insuranceNumber"
                  name="insurance_number"
                  onChange={onChange}
                  ref={register({
                    required: true,
                    minLength: 8,
                    maxLength: 15,
                    pattern: {
                      value: /^(0|[1-9][0-9]*)$/,
                    },
                  })}
                  placeholder="123456789"
                  value={infoToUpdate.insurance_number}
                />
              </div>
              {errors.insurance_number &&
                errors.insurance_number.type === "required" && (
                  <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
                    Insurance Number is required
                  </div>
                )}
              {errors.insurance_number &&
                errors.insurance_number.type === "minLength" && (
                  <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
                    Insurance number must be longer than 8 characters
                  </div>
                )}
              {errors.insurance_number &&
                errors.insurance_number.type === "maxLength" && (
                  <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
                    Insurance cannot exceed 15 characters
                  </div>
                )}
              {errors.insurance_number &&
                errors.insurance_number.type === "pattern" && (
                  <div className={`invalid-feedback d-flex col-sm-8 offset-4 `}>
                    Insurance must be a number
                  </div>
                )}
            </div>
          </Fragment>
        )}
        <div className="form-group row">
          <div className="col-sm-12">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="btn btn-secondary btn-block"
            >
              Edit Info
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default EditPersonalInfo;
