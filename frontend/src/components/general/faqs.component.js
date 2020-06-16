import React, { Component } from 'react';

export default class FAQS extends Component {

  render() {
    return (

      <main id="main">

        <section id="faq" class="faq section-bg">
            <div class="container" data-aos="fade-up">

              <div class="section-title">
                <h2>Frequently Asked Questions</h2>
                <p>We know you'll have some questions regarding our product. We have tried to answer some below.</p>
              </div>

              <div class="faq-list">
                <ul>
                  <li data-aos="fade-up">
                    <i class="bx bx-help-circle icon-help"></i> <a data-toggle="collapse" class="collapse" href="#faq-list-1">How do I get started with ArtzSpot? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-1" class="collapse show" data-parent=".faq-list">
                      <p>
                        If you're a<br />
                        <p>
                          <b>Patient</b>: simply sign up, and use our comprehensive search feature to decide and book an appointment with a suitable doctor near you.<br/>
                          <b>Doctor</b>: contact your Electronic Health Record (EHR) system vendor to inquire if they are registered with us. If yes, they will issue you the login credentials for ArztSpot.
                        </p>
                      </p>
                    </div>
                  </li>

                  <li data-aos="fade-up" data-aos-delay="100">
                    <i class="bx bx-help-circle icon-help"></i> <a data-toggle="collapse" href="#faq-list-2" class="collapsed">Where does my data go? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-2" class="collapse" data-parent=".faq-list">
                      <p>
                        Your profile data and medical records that you transmit through ArztSpot stay in a secure place with us until you have your profile activated. Once you stop using ArztSpot, we do not keep your data.
                      </p>
                    </div>
                  </li>

                  <li data-aos="fade-up" data-aos-delay="200">
                    <i class="bx bx-help-circle icon-help"></i> <a data-toggle="collapse" href="#faq-list-3" class="collapsed">Do I need to inform or check with the doctor again after booking an appointment with ArztSpot? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-3" class="collapse" data-parent=".faq-list">
                      <p>
                        The Appointment Confirmation issued to you by ArztSpot holds, and is present in the doctor's/institution's record as well, and hence it is not necessary to check with the doctor.
                      </p>
                    </div>
                  </li>

                  <li data-aos="fade-up" data-aos-delay="300">
                    <i class="bx bx-help-circle icon-help"></i> <a data-toggle="collapse" href="#faq-list-4" class="collapsed">I am a doctor with private practice, and have no existing Electronic Health Record (EHR) system. Can I register with ArztSpot? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-4" class="collapse" data-parent=".faq-list">
                      <p>
                        Yes, please use the Contact page to write to us. We will be happy to link you with an existing EHR vendor who already supports ArztSpot.
                      </p>
                    </div>
                  </li>

                  <li data-aos="fade-up" data-aos-delay="400">
                    <i class="bx bx-help-circle icon-help"></i> <a data-toggle="collapse" href="#faq-list-5" class="collapsed">I am a doctor with ArztSpot-supported Electronic Health Record (EHR) system. How do I use its functionality? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-5" class="collapse" data-parent=".faq-list">
                      <p>
                        If your vendor has activated the ArztSpot feature on your software, any appointments made by patients will automatically appear in your existing EHR system. Additionally, you can simply log-in to ArztSpot online to manage your Appointments, Questionnaires, and issued Prescriptions.
                      </p>
                    </div>
                  </li>

                </ul>
              </div>

            </div>
        </section>

      </main>

    );
  }
}