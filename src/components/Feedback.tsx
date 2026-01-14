import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom';

interface data 
{
  name: string
  department: string
  subject: string
  subjectcode: string
  _id: string;
}

function Feedback()
{

  const [teacher, setteacher] = useState<data[]>([])
  const navi = useNavigate()

  useEffect(() =>
  {
    fetchallteachers();
  }, [])

  useEffect(() =>
  {
    document.title = "Feedback";
  }, []);


  async function fetchallteachers() 
  {
    try 
    {
      const resp = await axios.get<{ statuscode: number; teacherdata?: data[] }>(`${process.env.REACT_APP_APIURL}/api/fetchallteachers`)

      if (resp.data.statuscode === 1 && resp.data.teacherdata) 
      {
        setteacher(resp.data.teacherdata);
      }
      else if (resp.data.statuscode === 0) 
      {
        setteacher([]);
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

  function next(id: string)
  {
    navi("/givefeedback?id=" + id)
  }

  return (
    <div>
      <div>
        <h1 className='mhd1 text-center '>Select the teacher for feedback</h1>
        <img src="assets/images/line1.svg" alt="underline" className="feedbackline" />
      </div>

      <div className='row mx-3' >
        {
          teacher.length > 0 ?
            <>
              {
                teacher.map((item, index) =>
                  <div className='col-lg-4 col-md-6 col-sm-12 mb-3'>
                    <div className="card" key={index}>
                      <div className="profile-container">
                        <div className="profile-background"></div>
                        <img className="profile-image" src="/assets/images/profile.jpg" alt="Profile" />
                      </div>

                      <div className="card-content  text-center">

                        <img className='comma1' src="/assets/images/comma.png" />
                        <h3 className='pname'>{item.name}</h3>
                        <img className='comma2' src="/assets/images/comma2.png" />

                        <p><strong>Department:</strong> {item.department}</p>
                        <p><strong>Subject Name:</strong> {item.subject}</p>
                        <p><strong>Subject Code:</strong> {item.subjectcode}</p>


                        <Link to={`/givefeedback?id=${item._id}`}><button className="feedback-button">Give Feedback</button></Link>


                      </div>
                    </div>
                  </div>
                )
              }
            </> : <div className="no-user-message">No Teacher Found</div>
        }
      </div>
      <div className='mt-5'></div>
      <Footer />

    </div>

  )
}

export default Feedback
