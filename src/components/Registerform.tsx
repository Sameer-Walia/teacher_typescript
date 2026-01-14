import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

function Registerform()
{

    const [name, setname] = useState<string>("");
    const [phone, setphone] = useState<string>("");
    const [email, setemail] = useState<string>("");
    const [rollno, setrollno] = useState<string>("");
    const [pass, setpass] = useState<string>("");
    const [cpass, setcpass] = useState<string>("");
    const [sem, setsem] = useState<number>(0);
    // const [sem, setsem] = useState<number>(1);         Initialize to 0 or 1 (if default semester is required) & not optional
    // const [sem, setsem] = useState<number | "">("");   If semester is optional initially:
    const [dep, setdep] = useState<string>("");
    const [terms, setterms] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(false);

    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "Register Page"
    }, [])

    async function onsignup(e: React.FormEvent<HTMLFormElement>) 
    {
        e.preventDefault()

        if (terms === true) 
        {
            if (pass === cpass) 
            {
                const reqdata = { name, phone, email, rollno, pass, sem, dep }
                try 
                {
                    setloading(true)
                    const resp = await axios.post(`${process.env.REACT_APP_APIURL}/api/signup`, reqdata)
                    if (resp.data.statuscode === 1)
                    {
                        navi("/thanks")
                        toast.success("Signup Successfull , check your email to activate your account")
                    }
                    else if (resp.data.statuscode === 2)
                    {
                        navi("/nothanks")
                        toast.warn("Signup Successfull , error while sending activation mail")
                    }
                    else if (resp.data.statuscode === 0)
                    {
                        toast.warn(resp.data.msg)
                    }
                    else
                    {
                        toast.error("Some problem occured")
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
                toast.error("Password Doesnot Match")
            }
        }
        else
        {
            toast.warn("Please accept terms and condition")
        }
    }

    return (
        <div>
            <form name="form1" onSubmit={onsignup} className="register-form mb-5" >

                <div className="input-row mt-5">
                    <div className="input-container col">
                        <input type="text" name="username" placeholder="" className="input-field" onChange={(e) => setname(e.target.value)} required />
                        <label className="input-label">
                            <span><i className="fa-solid fa-user" /></span><span>Username</span>
                        </label>
                    </div>

                    <div className="input-container col">
                        <input type="number" name="userrollno" placeholder="" className="input-field" onChange={(e) => setrollno(e.target.value)} required />
                        <label className="input-label">
                            <span><i className="fa-solid fa-id-card" /></span><span>Roll No.</span>
                        </label>
                    </div>
                </div>

                <div className="select-container mt-4 col">
                    <select
                        name="department"
                        className="select-box"
                        required
                        onChange={(e) => setdep(e.target.value)}
                    >
                        <option value="">Choose Department</option>
                        <option value="B.Tech Computer Science Engineering">B.Tech Computer Science Engineering</option>
                        <option value="B.Tech Electronics and Communication Engineering">B.Tech Electronics and Communication Engineering</option>
                        <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                    </select>
                    <label className="select-label">
                        <span><i className="fa-solid fa-school" /></span><span>Department</span>
                    </label>
                </div>


                <div className="input-row mt-4">
                    <div className="select-container col">
                        <select
                            name="Semester"
                            className="select-box"
                            required
                            onChange={(e) => setsem(Number(e.target.value))}
                        >
                            <option value="">Choose Semester</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>

                        <label className="select-label">
                            <span>Semester</span>
                        </label>
                    </div>


                    <div className="input-container col">
                        <input type="tel" name="usernumber" placeholder="" className="input-field" onChange={(e) => setphone(e.target.value)} minLength={10} maxLength={10} required />
                        <label className="input-label">
                            <span><i className="fa-solid fa-phone" /></span><span>Phone</span>
                        </label>
                    </div>
                </div>

                <div className="input-container mt-4 ">

                    <input type="email" name="useremail" placeholder="" className="input-field" onChange={(e) => setemail(e.target.value)} required />

                    <label className="input-label">
                        <span><i className="fa-solid fa-envelope" /></span><span>Email</span>
                    </label>

                </div>

                <div className="input-container mt-4 ">

                    <input type="password" name="password" placeholder="" className="input-field" onChange={(e) => setpass(e.target.value)} required />
                    {/* pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" */}

                    <label className="input-label">
                        <span><i className="fa-solid fa-lock" /></span><span>Password</span>
                    </label>

                </div>
                <div className="input-container mt-4 ">

                    <input type="password" name="confirmpass" placeholder="" className="input-field" onChange={(e) => setcpass(e.target.value)} required />

                    <label className="input-label">
                        <span><i className="fa-solid fa-lock" /></span><span>Confirm Password</span>
                    </label>


                </div>
                <label className="checkbox mt-4">
                    <input type="checkbox" name="cbx1" onChange={(e) => setterms(e.target.checked)} /><i> </i>I accept the terms and conditions
                </label>

                {
                    loading ?
                        <div className="loader-container mt-2">
                            <img src="assets/images/loader.gif" alt="loader" className="loader" />
                        </div> : <input type="submit" className="register-button" value="Submit" />
                }

                <p className="register-text">
                    Already registered? <Link to="/login" className="login-link" >Login</Link>
                </p>

            </form>

        </div>
    )
}

export default Registerform
