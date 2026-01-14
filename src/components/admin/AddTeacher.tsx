import React, { useEffect, useState } from 'react'
import Adminpanel from './Adminpanel'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

function AddTeacher()
{

    const navigate = useNavigate()

    const [name, setname] = useState<string>('');
    const [phone, setphone] = useState<string>('');
    const [email, setemail] = useState<string>('');
    const [subjectname, setsubjectname] = useState<string>('');
    const [subjectcode, setsubjectcode] = useState<string>('');
    const [dep, setdep] = useState<string>();
    const [loading, setloading] = useState<boolean>(false);

    useEffect(() =>
    {
        document.title = "Add Teacher";
    }, []);


    async function addteacher(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        try
        {
            setloading(true)
            const tdata = { name, phone, email, subjectname, subjectcode, dep }
            const resp = await axios.post<{ statuscode: number }>(`${process.env.REACT_APP_APIURL}/api/addteacher`, tdata)

            if (resp.data.statuscode === 1) 
            {
                toast.success("Teacher Added Successfully")
                navigate("/adminteacher")
            }
            else if (resp.data.statuscode === 0) 
            {
                toast.error("Cannot Added Teacher")
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
                    <h1 className='mhd'>Add Teacher Data</h1>
                </div>
                <section className="form-container ssss">
                    <form onSubmit={addteacher}>
                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" name="username" id="username" required onChange={(e) => setname(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label >Email</label>
                            <input type="email" name="email" id="email" required onChange={(e) => setemail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label >Phone</label>
                            <input type="tel" name="phone" id="phone" required onChange={(e) => setphone(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label >Department</label>
                            <select
                                name="department"
                                id="department"
                                required
                                onChange={(e) => setdep(e.target.value)}
                            >
                                <option value="">Choose Department</option>
                                <option value="B.Tech Computer Science Engineering">B.Tech Computer Science Engineering</option>
                                <option value="B.Tech Electronics and Communication Engineering">B.Tech Electronics and Communication</option>
                                <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label >Subject</label>
                            <input type="text" name="rollno" id="rollno" required onChange={(e) => setsubjectname(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label >Subject-Code</label>
                            <input type="text" name="rollno" id="rollno" required onChange={(e) => setsubjectcode(e.target.value)} />
                        </div>

                        {
                            loading ?
                                <div className="loader-container">
                                    <img src="assets/images/loader.gif" alt="loader" className="loader" />
                                </div> :
                                <div className="form-actions ">
                                    <input type="submit" className='subbtn1 mt-3' value="Add Teacher" />
                                </div>
                        }


                    </form>
                </section>

            </div>

        </div>
    )
}

export default AddTeacher
