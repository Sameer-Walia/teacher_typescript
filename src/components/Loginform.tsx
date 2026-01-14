import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../reduxslices/authSlice';
import { AppDispatch } from '../store';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

interface LoginResponse
{
    _id: string;
    name: string;
    phone: string;
    email: string;
    usertype: string;
    rollno: string;
    semester: number;
    department: string;
    actstatus: boolean;
}

interface GoogleJwtPayload
{
    email: string;
    name: string;
    sub: string;
}

function Loginform()
{

    const [email, setemail] = useState<string>("");
    const [pass, setpass] = useState<string>("");
    const [loading, setloading] = useState<boolean>(false);
    const [terms, setterms] = useState<boolean>(false);
    const usercokkie = new Cookies()

    const navi = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() =>
    {
        document.title = "Login Page"
    }, [])


    async function onlogin(e: React.FormEvent<HTMLFormElement>) 
    {
        e.preventDefault()
        const logindata = { email, pass };
        try 
        {
            setloading(true)
            const resp = await axios.post<{ statuscode: number; userdata?: LoginResponse }>(`${process.env.REACT_APP_APIURL}/api/login`, logindata, { withCredentials: true })
            console.log(resp.data)
            if (resp.data.statuscode === 0) 
            {
                toast.warn("Incorrect Email/Password")
                cancel();
            }
            else if (resp.data.statuscode === 1 && resp.data.userdata) 
            {
                if (resp.data.userdata.actstatus === true)
                {
                    dispatch(login(resp.data.userdata))
                    sessionStorage.setItem("userdata", JSON.stringify(resp.data.userdata));
                    if (terms)  // truthy value
                    {
                        usercokkie.set("staysignin", JSON.stringify(resp.data.userdata), { maxAge: 7 * 24 * 60 * 60, });
                    }
                    if (resp.data.userdata.usertype === "admin")
                    {
                        toast.success("Successfully Login")
                        navi("/adminhome")
                    }
                    else
                    {
                        toast.success("Successfully Login")
                        navi("/")
                    }
                }
                else
                {
                    toast.error("Your account is not activated , please check your email and activate your account")
                }
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

    function cancel()
    {
        setemail("");
        setpass("")
    }

    async function handleGoogleLoginSuccess(credentialResponse: CredentialResponse)
    {
        if (!credentialResponse.credential)
        {
            toast.error("Google login failed");
            return;
        }
        try
        {
            const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);

            const data = { email: decoded.email, name: decoded.name, googleId: decoded.sub, };

            const resp = await axios.post(`${process.env.REACT_APP_APIURL}/api/google_login`, data, { withCredentials: true, })
            {
                if (resp.data.statuscode === 1) 
                {
                    dispatch(login(resp.data.userdata))
                    sessionStorage.setItem("userdata", JSON.stringify(resp.data.userdata));
                    if (resp.data.userdata.usertype === "admin")
                    {
                        toast.success("Successfully Login")
                        navi("/adminhome")
                    }
                    else
                    {
                        toast.success("Successfully Login")
                        navi("/")
                    }

                }
                else
                {
                    toast.error("Some Problem Occured")
                }
            }
        }
        catch (e: any) 
        {
            toast.error("Error Occured " + e.message)
        }
    }

    function handleGoogleLoginError()
    {
        toast.error("Google Login Failed");
    }


    return (
        <div>
            {/* <form onSubmit={onlogin} className="register-form mt-5"> */}
            <form onSubmit={(e) => onlogin(e)} className="register-form mt-5">

                <div className="input-container mt-5 ">

                    <input type="email" name="useremail" placeholder="" value={email} onChange={(e) => setemail(e.target.value)} className="input-field" required />

                    <label className="input-label">
                        <span><i className="fa-solid fa-envelope" /></span><span>Email</span>
                    </label>

                </div>

                <div className="input-container mt-4 ">

                    <input type="password" name="userpass" placeholder="" value={pass} onChange={(e) => setpass(e.target.value)} className="input-field" required />

                    <label className="input-label">
                        <span><i className="fa-solid fa-lock" /></span><span>Password</span>
                    </label>
                </div>
                <br />

                <label className="checkbox">
                    <input type="checkbox" name="cbx1" onChange={(e) => setterms(e.target.checked)} /><i> </i>Stay Sign In
                </label>

                {
                    loading ?
                        <div className="loader-container mt-2">
                            <img src="assets/images/loader.gif" alt="loader" className="loader" />
                        </div> : <input type="submit" className="register-button" value="Submit" />
                }
                <b>or</b>
                <div style={{ marginTop: "10px" }}>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                    />
                </div>

                <p className="register-text ">
                    New Here? <Link to="/register" className="login-link" >Sign Up</Link>
                </p>
                <Link to="/forgotpassword" className="login-link" >Forgot Password</Link>

            </form>

        </div>
    )
}

export default Loginform
