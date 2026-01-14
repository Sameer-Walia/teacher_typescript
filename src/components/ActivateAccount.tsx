import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function ActivateAccount()
{

    const [msg, setmsg] = useState<string>('')
    const [params] = useSearchParams();
    const code = params.get("code")
    const navigate = useNavigate()

    useEffect(() =>
    {
        document.title = "Activate Account";
    }, []);

    useEffect(() => 
    {
        if (code)
        {
            activateuseraccount();
        }
    }, [code])

    async function activateuseraccount() 
    {
        try 
        {
            const apidata = { code }
            const resp = await axios.put(`${process.env.REACT_APP_APIURL}/api/activateuseraccount`, apidata)

            if (resp.data.statuscode === 1) 
            {
                toast.success("Account Activated Successfully, please login now");
                navigate("/login")
            }
            else if (resp.data.statuscode === 0) 
            {
                setmsg("Error while activating Account. May be u have already activated. U can directly Login now")
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
    }

    return (
        <>
            <div className="thanks-page">
                <div className="thanks-container">
                    <div className="thanks-content">
                        <h2 className="thanks-heading">
                            {msg}
                        </h2>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ActivateAccount;