import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AdminRouteProtectorProps
{
    compname: React.ComponentType;
}


// const AdminRouteProtector: React.FC<AdminRouteProtectorProps> = ({ compname: Component }) => 
function AdminRouteProtector({ compname: Component }: AdminRouteProtectorProps)
{

    const navigate = useNavigate();

    useEffect(() =>
    {
        const userdata = sessionStorage.getItem("userdata");

        if (!userdata)
        {
            toast.error("Please login to access the page");
            navigate("/login");
            return;
        }

        const user = JSON.parse(userdata);

        if (user.usertype !== "admin")
        {
            toast.error("Please login to access the admin page");
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <Component />;
        </div>
    )
}

export default AdminRouteProtector;
