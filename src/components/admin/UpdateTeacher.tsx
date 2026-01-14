import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import Adminpanel from './Adminpanel';

function UpdateTeacher()
{

    const [params] = useSearchParams();
    const tid = params.get("tid")

    const navigate = useNavigate();

    const [name, setname] = useState<string>("");
    const [phone, setphone] = useState<string>("");
    const [email, setemail] = useState<string>("");
    const [subject, setsubject] = useState<string>("");
    const [subjectcode, setsubjectcode] = useState<string>("");
    const [department, setdepartment] = useState<string>("");
    const [loading, setloading] = useState<boolean>(false);

    interface TeacherData
    {
        name: string;
        phone: string;
        email: string;
        subjectcode: string;
        department: string;
        subject: string;
        // params.get() returns string | null
        tid: string | null
    }

    useEffect(() =>
    {
        if (tid)
        {
            oneteacher();
        }
    }, [tid])

    useEffect(() =>
    {
        document.title = "Update Teacher";
    }, []);


    async function oneteacher()
    {
        try
        {
            const resp = await axios.get<{ statuscode: number; oneteacherdata?: TeacherData }>(`${process.env.REACT_APP_APIURL}/api/fetchoneteacher?id=` + tid)

            if (resp.data.statuscode === 1 && resp.data.oneteacherdata) 
            {
                const teacher = resp.data.oneteacherdata
                setname(teacher.name)
                setphone(teacher.phone)
                setemail(teacher.email)
                setdepartment(teacher.department)
                setsubject(teacher.subject)
                setsubjectcode(teacher.subjectcode)
            }
            else if (resp.data.statuscode === 0) 
            {
                toast.error("Cannot Fetch Teacher")
            }
            else 
            {
                toast.warn("Some Problem Occured")
            }
        }
        catch (e: any)
        {
            toast.error("Error Occured " + e.message)
        }
    }

    async function updateteacher(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        try 
        {
            setloading(true)
            const updateteacher: TeacherData = { name, phone, email, subject, subjectcode, department, tid }

            const resp = await axios.put<{ statuscode: number }>(`${process.env.REACT_APP_APIURL}/api/updateteacher`, updateteacher)

            if (resp.data.statuscode === 1) 
            {
                toast.success("Teacher Updated Successfully")
                navigate("/adminteacher");
            }
            else if (resp.data.statuscode === 0) 
            {
                toast.error("Teacher Cannot Updated Successfully. Do some changes for update")
            }
            else 
            {
                toast.error("Some error occured")
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

    return (
        <div>
            <Adminpanel />
            <div className='content1'>
                <div className="text-center pt-3">
                    <h1 className='mhd'>Update Teacher Data</h1>
                </div>
                <section className="form-container ssss">
                    <form onSubmit={updateteacher}>
                        <div className="form-group">
                            <label htmlFor="username">Name</label>
                            <input type="text" name="username" id="username" required value={name} onChange={(e) => setname(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" required value={email} onChange={(e) => setemail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="phone" id="phone" required value={phone} onChange={(e) => setphone(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <select
                                name="department"
                                id="department"
                                required
                                value={department}
                                onChange={(e) => setdepartment(e.target.value)}
                            >
                                <option value="B.Tech Computer Science Engineering">B.Tech Computer Science Engineering</option>
                                <option value="B.Tech Electronics and Communication ">B.Tech Electronics and Communication </option>
                                <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="rollno">Subject</label>
                            <input type="text" name="rollno" id="rollno" value={subject} required onChange={(e) => setsubject(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rollno">Subject-Code</label>
                            <input type="text" name="rollno" id="rollno" value={subjectcode} required onChange={(e) => setsubjectcode(e.target.value)} />
                        </div>

                        {
                            loading ?
                                <div className="loader-container">
                                    <img src="assets/images/loader.gif" alt="loader" className="loader" />
                                </div> :
                                <div className="form-actions ">
                                    <input type="submit" className='subbtn1 mt-3' value="Update Teacher" />
                                </div>
                        }


                    </form>
                </section>

            </div>
        </div>
    )
}

export default UpdateTeacher
