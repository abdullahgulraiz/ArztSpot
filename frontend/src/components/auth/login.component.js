import React, {useContext} from 'react';

export const Login = () => {

  return (

      <main id="main">

        <section id="contact" class="contact">
          <div class="container" data-aos="fade-up">

            <div class="section-title">
              <h2>Sign In</h2>
              <p>Please sign in with your account details to access application features.</p>
            </div>

            <div className="row">
              <div className="col-6 offset-3">
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type={"text"} className={"form-control"} id={"email"} placeholder={"Email"} name={"email"} required={"required"} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type={"password"} className={"form-control"} id={"password"} placeholder={"Password"} name={"password"} required={"true"} />
                  </div>
                  <div className="row" style={{marginTop: "3%"}}>
                    <div className="col-6 offset-3 text-center">
                      <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

  );
}