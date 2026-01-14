import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from '../reduxslices/authSlice';
import { AppDispatch, RootState } from '../store';

function CommonHeader()
{

  const { isLoggedIn, usertype } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  const navi = useNavigate();

  async function logout()
  {
    dispatch(LogOut())
    sessionStorage.clear()
    const resp = await axios.post(`${process.env.REACT_APP_APIURL}/api/logout`, {}, { withCredentials: true })
    navi("/login")
    toast.info("You have successfully Logged Out")
  }

  function selectpage(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)
  {
    e.preventDefault()
    const userData = sessionStorage.getItem("userdata");
    if (!userData) return;
    const user = JSON.parse(userData);
    if (user.usertype === "admin")
    {
      navi("/adminhome")
    }
    else
    {
      navi("/")
    }
  }

  function page(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)
  {
    e.preventDefault()
    if (isLoggedIn === false)
    {
      navi("/")
    }
    else
    {
      if (usertype === "admin")
      {
        navi("/adminhome")
      }
      else
      {
        navi("/")
      }
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg sticky-top theme1" id="header">
        <div className="container">
          <Link to="" onClick={selectpage} className="navbar-brand col-3" ><h3><span><i className="fa-regular fa-clone"></i></span> Excellence</h3></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item sameer">
                <Link to="" onClick={page} className="nav-link active sameerr" aria-current="page" >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/feedback" className="nav-link">Feedback</Link>
              </li>
              <li className="nav-item ">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
              <li className="nav-item ">
                <Link to="/changepassword" className="nav-link">Change Password</Link>
              </li>
            </ul>

            <Link to="/dashboard" className="btn btn1 mx-3">DashBoard</Link>
            <button onClick={logout} className="boder">Logout</button>
          </div>

        </div>
      </nav>
    </div>
  )
}

export default CommonHeader
