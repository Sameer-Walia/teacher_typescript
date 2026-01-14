import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { LogOut } from "../reduxslices/authSlice";
import { AppDispatch } from "../store";

const ResetPassword: React.FC = () => 
{

    const [newpass, setnewpass] = useState<string>('');
    const [cnewpass, setcnewpass] = useState<string>('');
    const [flag, setflag] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(false);
    const [params] = useSearchParams()
    const token = params.get("code")
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() =>
    {
        verifytoken()
    }, [token])

    async function verifytoken()
    {
        try
        {
            const resp = await axios.get<{ statuscode: number }>(`${process.env.REACT_APP_APIURL}/api/checktoken?token=` + token)
            if (resp.data.statuscode === 1)
            {
                setflag(true)
            }
            else if (resp.data.statuscode === 0)
            {
                setflag(false)
            }
            else if (resp.data.statuscode === 2)
            {
                setflag(false)
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
    }

    useEffect(() =>
    {
        document.title = "Reset Password";
    }, []);

    async function resetpassword(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        try
        {
            if (newpass === cnewpass)
            {
                const apidata = { newpass, token }
                const resp = await axios.put<{ statuscode: number }>(`${process.env.REACT_APP_APIURL}/api/resetpassword`, apidata, { withCredentials: true })
                if (resp.data.statuscode === 1)
                {
                    toast.success("Password Reset Successfully")
                    sessionStorage.clear()
                    dispatch(LogOut())
                    navigate("/login")
                    toast.info("You have been logged out , login with new password")
                }
                else if (resp.data.statuscode === 0)
                {
                    toast.warn("Password Not Reset Successfully")
                }
                else
                {
                    toast.error("Some Problem Occured")
                }
            }
            else
            {
                toast.warn("New Password and Confirm Mew Password doesnot Match")
            }

        }
        catch (e: any)
        {
            toast.error("Error Occured " + e.message)
        }
    }

    return (
        <>
            <div style={{ marginTop: "120px", textAlign: "center" }}>
                <div className="container">
                    <h2>Reset Password</h2>

                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">

                        {
                            flag ?
                                <form name="form1" onSubmit={resetpassword}>
                                    <div style={{ marginTop: "20px" }}>

                                        <div className="input-container mt-4 ">
                                            <input type="password" name="newpass" placeholder="New Password" required onChange={(e) => setnewpass(e.target.value)} className="change-password-input" /><br />

                                            <input type="password" name="cnewpass" placeholder="Confirm New Password" required onChange={(e) => setcnewpass(e.target.value)} className="change-password-input" />

                                        </div><br />

                                        {
                                            loading ?
                                                <div className="loader-container">
                                                    <img src="assets/images/loader.gif" alt="loader" className="loader" />
                                                </div> : <input type="submit" name="btn" value="Reset Password" className="btn btn-success" />
                                        }

                                    </div>
                                </form> : <h2>Invalid Token or Token expired</h2>
                        }
                    </div>

                </div>
            </div><br /><br /><br />

        </>
    )
}
export default ResetPassword;