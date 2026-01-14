import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Givefeedback: React.FC = () => 
{

    useEffect(() =>
    {
        document.title = "Give Feedback";
    }, []);

    interface teachername
    {
        name: string
    }
    interface rating
    {
        rating1: number
        rating2: number
        rating3: number
        rating4: number
        rating5: number
        rating6: number
        rating7: number
        rating8: number
        rating9: number
        rating10: number
        name: string
        thoughts: string
    }

    const [params] = useSearchParams()
    const tid = params.get("id")

    const [loading, setloading] = useState<boolean>(false);

    const [teacher, setteacher] = useState<teachername | null>(null)

    const [thoughts, setthoughts] = useState<string>("");

    let arr = new Array(5).fill(0)  // Fills every slot in the array with the value 0.

    const [rating1, setrating1] = useState<number>(1);
    const [hover1, sethover1] = useState<number>(0);

    const [rating2, setrating2] = useState<number>(1);
    const [hover2, sethover2] = useState<number>(0);

    const [rating3, setrating3] = useState<number>(1);
    const [hover3, sethover3] = useState<number>(0);

    const [rating4, setrating4] = useState<number>(1);
    const [hover4, sethover4] = useState<number>(0);

    const [rating5, setrating5] = useState<number>(1);
    const [hover5, sethover5] = useState<number>(0);

    const [rating6, setrating6] = useState<number>(1);
    const [hover6, sethover6] = useState<number>(0);

    const [rating7, setrating7] = useState<number>(1);
    const [hover7, sethover7] = useState<number>(0);

    const [rating8, setrating8] = useState<number>(1);
    const [hover8, sethover8] = useState<number>(0);

    const [rating9, setrating9] = useState<number>(1);
    const [hover9, sethover9] = useState<number>(0);

    const [rating10, setrating10] = useState<number>(1);
    const [hover10, sethover10] = useState<number>(0);



    useEffect(() =>
    {
        if (tid)
        {
            fetchoneteacher()
        }
    }, [tid])

    async function fetchoneteacher() 
    {
        try 
        {
            const resp = await axios.get<{ statuscode: number; teacherdata?: teachername }>(`${process.env.REACT_APP_APIURL}/api/fetchteachername/${tid}`)

            if (resp.data.statuscode === 1 && resp.data.teacherdata) 
            {
                setteacher(resp.data.teacherdata);
            }
            else if (resp.data.statuscode === 0) 
            {
                setteacher(null);
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

    async function subfeed(e: React.FormEvent<HTMLFormElement>) 
    {
        e.preventDefault()

        if (!teacher) return;

        const feedback: rating = { rating1, rating2, rating3, rating4, rating5, rating6, rating7, rating8, rating9, rating10, name: teacher.name, thoughts }
        try 
        {
            setloading(true)
            const resp = await axios.post<{ statuscode: number; msg?: string }>(`${process.env.REACT_APP_APIURL}/api/submitfeedback`, feedback)

            if (resp.data.statuscode === 1) 
            {
                toast.success("Feedback Submitted Successfully")
                setrating1(1);
                setrating2(1);
                setrating3(1);
                setrating4(1);
                setrating5(1);
                setrating6(1);
                setrating7(1);
                setrating8(1);
                setrating9(1);
                setrating10(1);
                setthoughts("");
            }
            else if (resp.data.statuscode === 0) 
            {
                toast.error(resp.data.msg);
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

    return (
        <div>
            <div>
                {/* {
                    teacher.length > 0 ?
                        <>
                            {
                                teacher.map((item, index) =>
                                    <div key={index}>
                                        <h1 className='mhd1 text-center mx-2'>Feedback for {item.name}</h1>
                                        <img src="assets/images/line1.svg" alt="underline" className="feedbackline" />
                                    </div>
                                )
                            }
                        </> : <div className="no-user-message">No Teacher Found</div>
                } */}

                <h1 className='mhd1 text-center mx-2'>Feedback for {teacher?.name}</h1>
                <img src="assets/images/line1.svg" alt="underline" className="feedbackline mb-5" />
            </div>

            <form onSubmit={subfeed}>
                <div className="feedbord">
                    <div className='head'>Please Rate !</div>
                    <div className='contain'>
                        <p className="title">Knowledge base of the teacher (as perceived by you)</p>
                        <div className="rating">
                            {
                                arr.map((item, index) =>
                                    <span key={index}
                                        className={`${hover1 == 0 && index < rating1 || index < hover1 ? "filled" : ""} star `}
                                        onClick={() => setrating1(index + 1)}
                                        onMouseEnter={() => sethover1(index + 1)}
                                        onMouseLeave={() => sethover1(0)}>
                                        &#9733;
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='contain mt-4'>
                        <p className="title">Communication skills (in terms of articulation and comprehensibility)</p>
                        <div className="rating">
                            {
                                arr.map((item, index) =>
                                    <span key={index}
                                        className={`${hover2 == 0 && index < rating2 || index < hover2 ? "filled" : ""} star `}
                                        onClick={() => setrating2(index + 1)}
                                        onMouseEnter={() => sethover2(index + 1)}
                                        onMouseLeave={() => sethover2(0)}>
                                        &#9733;
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='contain mt-4'>
                        <p className="title">Sincerity / Commitment of the teacher (in terms of preparedness and interest in taking classes)</p>
                        <div className="rating">
                            {
                                arr.map((item, index) =>
                                    <span key={index}
                                        className={`${hover3 == 0 && index < rating3 || index < hover3 ? "filled" : ""} star `}
                                        onClick={() => setrating3(index + 1)}
                                        onMouseEnter={() => sethover3(index + 1)}
                                        onMouseLeave={() => sethover3(0)}>
                                        &#9733;
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='contain mt-4'>
                        <p className="title">Interest generated by the teacher in the className</p>
                        <div className="rating">
                            {
                                arr.map((item, index) =>
                                    <span key={index}
                                        className={`${hover4 == 0 && index < rating4 || index < hover4 ? "filled" : ""} star `}
                                        onClick={() => setrating4(index + 1)}
                                        onMouseEnter={() => sethover4(index + 1)}
                                        onMouseLeave={() => sethover4(0)}>
                                        &#9733;
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='contain mt-4'>
                        <p className="title">Ability to integrate course material with environment / other issues, to provide a broader perspective</p>
                        <div className="rating">
                            {
                                arr.map((item, index) =>
                                    <span key={index}
                                        className={`${hover5 == 0 && index < rating5 || index < hover5 ? "filled" : ""} star `}
                                        onClick={() => setrating5(index + 1)}
                                        onMouseEnter={() => sethover5(index + 1)}
                                        onMouseLeave={() => sethover5(0)}>
                                        &#9733;
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='contain mt-4'>
                        <p className="title">Accessibility and availability of the teacher in the department for academic consultations</p>
                        <div className="rating">
                            {
                                arr.map((item, index) =>
                                    <span key={index}
                                        className={`${hover6 == 0 && index < rating6 || index < hover6 ? "filled" : ""} star `}
                                        onClick={() => setrating6(index + 1)}
                                        onMouseEnter={() => sethover6(index + 1)}
                                        onMouseLeave={() => sethover6(0)}>
                                        &#9733;
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='contain mt-4'>
                        <p className="title">Initiative taken in formulating topics/ tests/assignments/examinations / seminars and projects</p>
                        <div className="rating">
                            {
                                arr.map((item, index) =>
                                    <span key={index}
                                        className={`${hover7 == 0 && index < rating7 || index < hover7 ? "filled" : ""} star `}
                                        onClick={() => setrating7(index + 1)}
                                        onMouseEnter={() => sethover7(index + 1)}
                                        onMouseLeave={() => sethover7(0)}>
                                        &#9733;
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='contain mt-4'>
                        <p className="title">Regularity in taking classes</p>
                        <div className="rating">
                            {
                                arr.map((item, index) =>
                                    <span key={index}
                                        className={`${hover8 == 0 && index < rating8 || index < hover8 ? "filled" : ""} star `}
                                        onClick={() => setrating8(index + 1)}
                                        onMouseEnter={() => sethover8(index + 1)}
                                        onMouseLeave={() => sethover8(0)}>
                                        &#9733;
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='contain mt-4'>
                        <p className="title">Completion of the course in a thorough and satisfactory manner</p>
                        <div className="rating">
                            {
                                arr.map((item, index) =>
                                    <span key={index}
                                        className={`${hover9 == 0 && index < rating9 || index < hover9 ? "filled" : ""} star `}
                                        onClick={() => setrating9(index + 1)}
                                        onMouseEnter={() => sethover9(index + 1)}
                                        onMouseLeave={() => sethover9(0)}>
                                        &#9733;
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <div className='contain mt-4'>
                        <p className="title">Fairness in evaluating student performance and awarding grades.</p>
                        <div className="rating">
                            {
                                arr.map((item, index) =>
                                    <span key={index}
                                        className={`${hover10 == 0 && index < rating10 || index < hover10 ? "filled" : ""} star `}
                                        onClick={() => setrating10(index + 1)}
                                        onMouseEnter={() => sethover10(index + 1)}
                                        onMouseLeave={() => sethover10(0)}>
                                        &#9733;
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    <h1 className='mhd2 text-center'>Your Thoughts</h1>
                    <img src="assets/images/line1.svg" alt="underline" className="feedbackline1 mb-5" />
                    <textarea className="custom-textarea" required onChange={(e) => setthoughts(e.target.value)} value={thoughts} ></textarea>
                    {
                        loading ?
                            <div className="loader-container">
                                <img src="assets/images/loader.gif" alt="loader" className="loader" />
                            </div> : <button type="submit" className="custom-button ">Submit Feedback</button>
                    }

                </div>
            </form>

        </div>
    )

}

export default Givefeedback
