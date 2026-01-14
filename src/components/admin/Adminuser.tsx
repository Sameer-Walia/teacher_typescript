import React, { useEffect, useState } from 'react';
import Adminpanel from './Adminpanel';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Define the shape of user data
interface User
{
    _id: string;
    name: string;
    rollno: string;
    department: string;
    semester: string | number;
    email: string;
    phone: string;
}

function Adminuser() 
{
    const [membersdata, setmembersdata] = useState<User[]>([]);

    useEffect(() =>
    {
        fetchalluser();
    }, []);

    useEffect(() =>
    {
        document.title = "All User";
    }, []);

    // Fetch all users
    const fetchalluser = async () =>
    {
        try
        {
            const resp = await axios.get<{ statuscode: number; usersdata?: User[] }>(`${process.env.REACT_APP_APIURL}/api/fetchallusers`, { withCredentials: true });

            if (resp.data.statuscode === 1 && resp.data.usersdata)
            {
                setmembersdata(resp.data.usersdata);
            }
            else if (resp.data.statuscode === 0)
            {
                setmembersdata([]);
            } else
            {
                toast.warn("Some Problem Occurred");
            }
        } catch (e: any)
        {
            toast.error("Error Occurred: " + e.message);
        }
    };

    const deluser = async (id: string) =>
    {
        const confirmDelete = window.confirm("Are you sure you want to delete the user?");
        if (!confirmDelete) return;

        try
        {
            const resp = await axios.delete<{ statuscode: number }>(
                `${process.env.REACT_APP_APIURL}/api/deluser?id=${id}`
            );

            if (resp.data.statuscode === 1)
            {
                toast.success("User Deleted Successfully");
                fetchalluser();
            } else if (resp.data.statuscode === 0)
            {
                alert("User not Deleted");
            } else
            {
                toast.warn("Some Problem Occurred");
            }
        } catch (e: any)
        {
            toast.error("Error Occurred: " + e.message);
        }
    };

    return (
        <div>
            <Adminpanel />
            <div className='content1 pad'>
                {membersdata.length > 0 ? (
                    <div className='backcolor'>
                        <h1 className="title12 mt-5">Admin Users Data</h1>

                        <div className="summary">
                            <div className='row'>
                                <div className='col-6'>
                                    <td className="table-cell">
                                        <Link to={`/searchuser`} className="edit-button1">
                                            Search User
                                        </Link>
                                    </td>
                                </div>
                                <div className='col-6'>
                                    <p className="total-users">Total Users Registered: {membersdata.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="table-container">
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Roll No</th>
                                        <th>Department</th>
                                        <th>Semester</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {membersdata.map((item) => (
                                        <tr key={item._id} className="table-row">
                                            <td className="table-cell">{item.name}</td>
                                            <td className="table-cell">{item.rollno}</td>
                                            <td className="table-cell">{item.department}</td>
                                            <td className="table-cell">{item.semester}</td>
                                            <td className="table-cell">{item.email}</td>
                                            <td className="table-cell">{item.phone}</td>
                                            <td className="table-cell">
                                                <Link to={`/updateuser?pid=${item._id}`} className="edit-button">
                                                    Edit
                                                </Link>
                                            </td>
                                            <td className="table-cell">
                                                <button className="delete-btn" onClick={() => deluser(item._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="no-user-message">No User Found</div>
                )}
            </div>
        </div>
    );
};

export default Adminuser;
