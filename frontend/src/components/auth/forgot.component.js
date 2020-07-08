import React, {Component, useState} from "react";
import { Link } from 'react-router-dom';
import {reverse} from "named-urls";
import routes from "../../routes";
import { useForm } from "react-hook-form";


export default function ForgotPassword() {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return (
        <main id="main">
            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Did you forget your password?</h2>
                        <p> Don't worry, we will send you a message to help you reset your password</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-6 offset-3">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type={"text"} className={`form-control ${
                                        errors.email && "is-invalid"
                                    } `} id={"email"} placeholder={"Email"}
                                           name={"email"} ref = {register({ pattern: mailformat})}/>
                                </div>
                                {errors.email && <div className="alert alert-danger" role="alert">
                                    Please enter a valid email
                                </div>}
                                <div className="col-6 offset-3 text-center">
                                    <button type="submit" className="btn btn-primary">Continue</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="section-title" style={{marginTop: "3%"}}>
                        <Link to={reverse(routes.auth.login)} className="btn-get-started scrollto">Back</Link>
                    </div>

                </div>
            </section>
        </main>
    );
}
