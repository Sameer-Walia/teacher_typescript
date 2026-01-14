import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Adminpanel()
{

    useEffect(() =>
    {
        document.title = "Admin Panel";
    }, []);

    const [activeTab, setactiveTab] = useState("Users");

    useEffect(() =>
    {
        const savedActiveLink = localStorage.getItem("tabLink");
        if (savedActiveLink)
        {
            setactiveTab(savedActiveLink);
        }
    }, []);

    function handleTabClick(tabname:string)
    {
        setactiveTab(tabname);
        localStorage.setItem("tabLink", tabname);
    };


    return (
        <>
            <aside className="sidebar">
                <br />

                <div className="admin-panel">
                    Admin Panel
                </div>

                <nav className="sidebar-nav">
                    <Link to="/adminuser" className={`sidebar-link , ${activeTab === "user" ? "active" : ""}`} onClick={() => handleTabClick("user")}><span className="sidebar-icon">{<i className="fa-solid fa-user" />}</span>Users</Link>

                    <Link to="/adminteacher" className={`sidebar-link , ${activeTab === "Syallabus" ? "active" : ""}`} onClick={() => handleTabClick("Syallabus")}><span className="sidebar-icon">{<i className="fa-solid fa-user" />}</span>Teacher</Link>

                    <Link to="/Teachers_Feedback" className={`sidebar-link , ${activeTab === "Teachers_Feedback" ? "active" : ""}`} onClick={() => handleTabClick("Teachers_Feedback")}><span className="sidebar-icon">{<i className="fa-solid fa-user" />}</span>Feedback</Link>

                    <Link to="/performance" className={`sidebar-link , ${activeTab === "performance" ? "active" : ""}`} onClick={() => handleTabClick("performance")}><span className="sidebar-icon">{<i className="fa-solid fa-user" />}</span>Performance</Link>

                    <Link to="/admincontact" className={`sidebar-link , ${activeTab === "contact" ? "active" : ""}`} onClick={() => handleTabClick("contact")}><span className="sidebar-icon">{<i className="fa-solid fa-phone"  />}</span>Contact</Link>

                    <Link to="/adminhome" className="sidebar-link"><span className="sidebar-icon">{<i className="fa-solid fa-school" />}</span>Home</Link>

                </nav>
            </aside>
        </>
    )

}

export default Adminpanel
