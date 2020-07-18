import React, { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/auth/AuthState";
const Register = () => {
  const authContext = useContext(AuthContext);
  const { userToCreateRole, userToCreate, setUserToCreate } = authContext;
  const { register, handleSubmit, errors } = useForm();

  const onChange = (e) => {
    setUserToCreate({ ...userToCreate, [e.target.name]: e.target.value });
  };

  const onSubmit = (data) => {
    console.log(data);
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
                        <div className={`pl-0 invalid-feedback d-inline col-md-6 `}>
                          Firstname is required.
                        </div>
                      )}
                    {errors.firstname &&
                      errors.firstname.type === "minLength" && (
                        <div className={`pl-0 invalid-feedback d-inline col-md-6 `}>
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
                      <div className={`pl-0 invalid-feedback d-inline col-md-6 `}>
                        Lastname is required.
                      </div>
                    )}
                    {errors.lastname &&
                      errors.lastname.type === "minLength" && (
                        <div className={`pl-0 invalid-feedback d-inline col-md-6 `}>
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
                      <div className={`pl-0 invalid-feedback d-inline col-md-6 `}>
                        Email is required.
                      </div>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <div className={`pl-0 invalid-feedback d-inline col-md-6 `}>
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
                      <div className={`pl-0 invalid-feedback d-inline col-md-6 `}>
                        Password is required.
                      </div>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                      <div className={`pl-0 invalid-feedback d-inline col-md-6 `}>
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                </div>

                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                      data-toggle="collapse"
                      role="button"
                      aria-expanded="true"
                      aria-controls="multiCollapse"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="gridCheck1"
                      data-toggle="collapse"
                      role="button"
                      aria-expanded="true"
                      aria-controls="multiCollapse"
                    >
                      I'm NOT a health professional
                    </label>
                  </div>
                </div>
                <div className="collapse multi-collapse" id="multiCollapse">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputID4">Personal ID</label>
                      <input
                        type={"text"}
                        onChange={onChange}
                        className={"form-control"}
                        id={"date"}
                        placeholder={"48925338-D"}
                        name={"ID"}
                        required={"required"}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputDate4">Date of Birth</label>
                      <input
                        type={"text"}
                        onChange={onChange}
                        className={"form-control"}
                        id={"date"}
                        placeholder={"DD.MM.YYYY"}
                        name={"date"}
                        required={"required"}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPlace4">Place of Birth</label>
                      <input
                        type={"text"}
                        onChange={onChange}
                        className={"form-control"}
                        id={"place"}
                        placeholder={"City of Birth"}
                        name={"place"}
                        required={"required"}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="Leopoldstraße 45"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputCity">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCity"
                        placeholder={"Country"}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="inputState">City</label>
                      <select id="inputState" className="form-control">
                        <option selected>Choose...</option>
                        <option>Aachen</option>
                        <option>Berlin</option>
                        <option>Munich</option>
                      </select>
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor="inputZip">Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputZip"
                        placeholder={"80331"}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="inputInsurance">Insurance</label>
                      <select id="inputInsurance" className="form-control">
                        <option selected>Choose...</option>
                        <option>AOK</option>
                        <option>Barmer GEK</option>
                        <option>TK</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputCity">Insurance ID</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputInsuranceID"
                        placeholder={"123 456789 K"}
                      />
                    </div>
                  </div>
                </div>
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
