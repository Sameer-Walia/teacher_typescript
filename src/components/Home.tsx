import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Typewriter from './Typewriter';
import Footer from './Footer';
import Marquee from 'react-fast-marquee';

function Home()
{

    useEffect(() =>
    {
        document.title = "Home Page"
    }, [])

    return (
        <div>
            <div>
                <Marquee speed={200} className="marquee" >
                    <p>
                        📊 Welcome to the Feedback Portal for Educational Institutions! &nbsp; 💡 Empowering Teachers Through Actionable Feedback! &nbsp; 📋 Analyze Teacher Performance with In-Depth Feedback Reports! &nbsp; ⏱️ Real-Time Feedback Analysis for Continuous Improvement!
                    </p>
                </Marquee>
            </div>


            <div id="about" className="pd theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12 ">
                            <h1 className="mt-4 hd main-heading">WELCOME TO <span className='ccc'><Typewriter /></span></h1>

                            <p className="para my-4">"Empowering education with student feedback. Analyze and improve teacher performance to enhance learning experiences."</p>

                            <Link to="/signup" className="btn btn2 ">Register</Link>
                            <Link to="/login" className="btn btn1 mx-3">Login</Link>

                        </div>
                        <div className="col-lg-6 col-12 mt-lg-0 mt-5">
                            <img src="assets/images/homeHero.png" className="img-fluid img-main " />
                        </div>
                    </div>
                </div>
            </div>

            <div id="services" className="pd gr theme1">
                <div className="container">
                    <h1 className="text-center hd head ">How It <span className='ccc'>Works</span></h1>
                    <div className="row mt-5">

                        <div className="col-lg-4 col-md-6 col-12 px-4">
                            <img src="/assets/images/loginIcon.png" className="imgheight" alt="Login Icon" />
                            <h3 className="write mt-3">Step 1: Login</h3>
                            <p className="text-gray-600 max-w-xs mt-3">Students login using their roll number and OTP sent to their email or phone.</p>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12 px-4 mt-md-0 mt-5">
                            <img src="/assets/images/feedbackIcon.png" className="imgheight" alt="Login Icon" />
                            <h3 className="write mt-3">Step 2: Submit Feedback</h3>
                            <p className="text-gray-600 max-w-xs mt-3">Choose the subject and teacher, and provide feedback on the various parameters.</p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 px-4 mt-lg-0 mt-5 mx-auto">
                            <img src="/assets/images/analysisIcon.png" className="imgheight" alt="Login Icon" />
                            <h3 className=" write mt-3">Step 3: Analyze Results</h3>
                            <p className="text-gray-600 max-w-xs mt-3">Admins can view and analyze the feedback, generating suggestions for improvement.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-background">
                <div className="custom-text-center">
                    <h1 className="custom-title ">Write Your Feedback Now!</h1>
                    <h2 className="custom-subtitle">Empowering Teachers Through Actionable Feedback!</h2>
                    <div className="custom-buttons">
                        <Link to="/login" className="custom-button-start" >Get started now</Link>
                        <Link to="/contact" className="custom-button-contact" >Contact Us</Link>
                    </div>
                </div>
            </div>

            <div id="solution" className="pd theme2" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <h1 className="hd">Need a Beter Work? We are here to IT Solution with 30 years of experience</h1>
                            <ul className="nav nav-pills mb-4 mt-4 nav-fill" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">What we do</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Our Mission</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Social impact</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                                    <h3>To believe that the smart looking website is the first impression all over.</h3>
                                    <p className="para">This Our History to a tendency to believe that the smart looking website is the first impression. Lorem dolor sit amet, elit!</p>
                                    <ul className="list-unstyled">
                                        <li><span className="fa fa-check"></span>Leading private equity firms</li>
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                                    <h3>This Our History to a tendency to believe that the smart looking website is the first impression.</h3>
                                    <p className="para">Lorem ipsum dolor sit amet, elit. Id ab commodi impedit magnam sint voluptates. Minima velit expedita maiores, sit at in!</p>
                                    <ul className="list-unstyled">
                                        <li><span className="fa fa-check"></span>Helping Nonprofit organizations</li>
                                        <li><span className="fa fa-check"></span>   Leading private equity firms</li>
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
                                    <h3>This Our History to a tendency to believe thes that smart looking website is the first impression.</h3>
                                    <p className="para"> Lorem ipsum dolor sit amet, elit. Id ab commodi impedit magnam sint voluptates. Minima velit expedita maiores, sit at in!!</p>
                                    <ul className="list-unstyled">
                                        <li><span className="fa fa-check"></span> Always Fast and friendly support</li>
                                        <li><span className="fa fa-check"></span> Experienced Professional Team</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-12 ps-3 mt-lg-0 mt-5">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            How much does a static website cost?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eos vero quis quas eius distinctio nostrum voluptas numquam? Dolores dolor magni obcaecati iusto tempora esse rem at repellat vero beatae!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            How to choose a best web template?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eos vero quis quas eius distinctio nostrum voluptas numquam? Dolores dolor magni obcaecati iusto tempora esse rem at repellat vero beatae!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            How to download a template?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eos vero quis quas eius distinctio nostrum voluptas numquam? Dolores dolor magni obcaecati iusto tempora esse rem at repellat vero beatae!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                            Why should i choose a free website?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eos vero quis quas eius distinctio nostrum voluptas numquam? Dolores dolor magni obcaecati iusto tempora esse rem at repellat vero beatae!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                            Why should i choose a free website?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eos vero quis quas eius distinctio nostrum voluptas numquam? Dolores dolor magni obcaecati iusto tempora esse rem at repellat vero beatae!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Home
