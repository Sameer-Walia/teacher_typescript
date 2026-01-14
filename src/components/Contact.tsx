import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import ReCAPTCHA from 'react-google-recaptcha';

function Contact()
{
    const { name, email } = useSelector((state: RootState) => state.auth)
    const [message, setmessage] = useState<string>("");
    const [loading, setloading] = useState<boolean>(false);
    const [hcaptcha, sethcaptcha] = useState<boolean>(false);


    useEffect(() =>
    {
        document.title = "Contact Us";
    }, []);

    function onChange(value: string | null) 
    {
        console.log("Captcha value:", value);
        if (value === null || value === "")
        {
            sethcaptcha(false)
        }
        else
        {
            sethcaptcha(true)
        }
    }

    async function contact(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        if (hcaptcha === true)
        {
            try
            {
                setloading(true)
                const cdata = { name, email, message }
                const resp = await axios.post<{ statuscode: number }>(`${process.env.REACT_APP_APIURL}/api/ContactUs`, cdata)

                if (resp.data.statuscode === 1) 
                {
                    toast.success("Message submitted successfully. We will revert back in 24 hours")
                    canceldb();
                }
                else if (resp.data.statuscode === 0) 
                {
                    toast.warning("Error sending message , try again");
                }
                else 
                {
                    toast.error("Some Problem Occured")
                }
            }
            catch (e: any)
            {
                toast.error("Error Occured " + e.message)
            }
            finally
            {
                setloading(false)
            }
        }
        else
        {
            toast.error("Captcha Verification failed , try again")
        }
    }

    function canceldb()
    {
        setmessage("")
    }

    return (
        <div>
            <div className="container123 ">
                <div className="grid mt-5 mb-5">
                    <div className="text-content">
                        <div className="header">
                            <h2 className="title">
                                <span>Contact Us</span>
                                <img src="assets/images/line.svg" className="underline" alt="underline"></img>
                            </h2>
                        </div>
                        <p className="description">We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out. Your thoughts are important to us, and we're here to assist you with anything you need. Fill out the form below, and we'll get back to you as soon as possible.</p>
                    </div>
                    <div className="form-container2">
                        <div className="form-header">
                            <h1>Send us a message</h1>
                        </div>
                        <form className="form" onSubmit={contact}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" className='val readonly' value={name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                {/* In your Redux state, email is probably string | null, but <input> in React cannot have null for value. */}
                                <input type="email" id="email" className='val' value={email || ""} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" className='area val' onChange={(e) => setmessage(e.target.value)} required></textarea>
                            </div>

                            <ReCAPTCHA sitekey="6LfERsgrAAAAALuRJGrIb-al3osvxot0jCNfyLgU" onChange={onChange} />

                            {
                                loading ?
                                    <div className="loader-container">
                                        <img src="assets/images/loader.gif" alt="loader" className="loader" />
                                    </div> : <button type="submit">Submit</button>
                            }

                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact
