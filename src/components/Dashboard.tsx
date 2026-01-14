
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../store";


interface User
{
    name: string;
    phone: string;
    rollno: string;
    semester: string;
    department: string;
}

function Dashboard()
{

    useEffect(() =>
    {
        document.title = "DashBoard";
    }, []);

    const navi = useNavigate();

    const [phone, setphone] = useState<string>('');
    const [name, setname] = useState<string>('');;
    const [rollno, setrollno] = useState<string>('');;
    const [sem, setsem] = useState<string>('');;
    const [dep, setdep] = useState<string>('');;

    const { isLoggedIn, email } = useSelector((state: RootState) => state.auth)

    useEffect(() =>
    {
        if (isLoggedIn === true)
        {
            fetchoneuser()
        }
    }, [isLoggedIn])

    async function fetchoneuser() 
    {
        try 
        {
            const resp = await axios.get<{ statuscode: number; oneuserdata?: User }>(`${process.env.REACT_APP_APIURL}/api/fetchoneuserdata/${email}`)

            if (resp.data.statuscode === 1 && resp.data.oneuserdata)
            {
                const user = resp.data.oneuserdata;
                setname(user.name);
                setphone(user.phone);
                setrollno(user.rollno);
                setsem(user.semester);
                setdep(user.department);
            }
            else if (resp.data.statuscode === 0) 
            {
                toast.error("Cannot Fetch User Data. Please Login again")
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

    function edit()
    {
        navi("/editprofile")
    }

    return (
        <div>
            <div className="container2">
                <h2 className="header">
                    <span className="title">
                        <span className="title-text">User Information</span>
                        <img src={`assets/images/line1.svg`} className="underline11" alt="underline" />
                    </span>
                </h2>
                <div className="content">
                    <div className="avatar-container">
                        <img src="assets/images/profile2.jpg" alt="User Avatar" className="avatar" />
                    </div>
                    <div className="info-grid">
                        <div className="info-card">
                            <i className="fa-solid fa-user" />
                            <div>
                                <p className="label">Name</p>
                                <p className="value">{name}</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <i className="fa-solid fa-envelope" />
                            <div>
                                <p className="label">Email</p>
                                <p className="value">{email}</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <i className="fa-solid fa-phone" />
                            <div>
                                <p className="label">Phone</p>
                                <p className="value">{phone}</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <i className="fa-solid fa-id-card" />
                            <div>
                                <p className="label">University Roll No</p>
                                <p className="value">{rollno}</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <i className="fa-solid fa-calendar-days" />
                            <div>
                                <p className="label">Semester</p>
                                <p className="value">{sem}</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <i className="fa-solid fa-building-columns" />
                            <div>
                                <p className="label">Department</p>
                                <p className="value">{dep}</p>
                            </div>
                        </div>

                    </div>
                    <div className="edit-button-container">
                        <button className="edit-button " onClick={edit}><i className="fa-solid fa-pencil" />
                            &nbsp;&nbsp;Edit Profile</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard
