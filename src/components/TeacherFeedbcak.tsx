import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Footer from './Footer'
import Adminpanel from './admin/Adminpanel'

interface Teacherdata 
{
    name: string
    department: string
    subject: string
    subjectcode: string
    _id: string;
}

function TeacherFeedbcak()
{

    const [teacher, setteacher] = useState<Teacherdata[]>([])
    const [loading, setloading] = useState<boolean>(false);

    useEffect(() =>
    {
        allteacherfeed()
    }, [])

    useEffect(() =>
    {
        document.title = "All Teachers Feedback";
    }, []);

    async function allteacherfeed() 
    {
        try 
        {
            setloading(true)
            const resp = await axios.get<{ statuscode: number, teacherdata?: Teacherdata[] }>(`${process.env.REACT_APP_APIURL}/api/allteacherfeed`)

            if (resp.data.statuscode === 1 && resp.data.teacherdata)
            {
                setteacher(resp.data.teacherdata)
            }
            else if (resp.data.statuscode === 0) 
            {
                setteacher([]);
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
            {
                loading ?
                    <div className="loader-container">
                        <img src="assets/images/loader.gif" alt="loader" className="loader" />
                    </div> :
                    <div className='content1 pad'>
                        <div className='backcolor btm'>

                            <div>
                                <h1 className='mhd22 text-center pt-5'>Admin Feedback Panel</h1>
                                <img src="assets/images/line1.svg" alt="underline" className="feedbackline" />
                            </div>

                            <div className='row mx-3' >
                                {
                                    teacher.length > 0 ?
                                        <>
                                            {
                                                teacher.map((item) =>
                                                    <div className='col-lg-6 col-md-12 col-sm-12 aaaa'>
                                                        <div className="card" key={item._id}>

                                                            <div className="card-content  text-center">

                                                                <h3 className='pname'>{item.name}</h3>

                                                                <p><strong>Department:</strong> {item.department}</p>
                                                                <p><strong>Subject Name:</strong> {item.subject}</p>
                                                                <p><strong>Subject Code:</strong> {item.subjectcode}</p>

                                                                <Link to={`/getuniquefeedback?name=${item.name}`}><button className="feedback-button1">Explore</button></Link>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </> : <div className="no-user-message">No Teacher Found</div>
                                }
                            </div>
                            <div className='mt-5'></div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default TeacherFeedbcak
