import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Authpage from './Authpage'
import AdminHome from './admin/AdminHome'
import Adminuser from './admin/Adminuser'
import Feedback from './Feedback'
import AdminTeacher from './admin/AdminTeacher'
import AddTeacher from './admin/AddTeacher'
import UpdateTeacher from './admin/UpdateTeacher'
import Givefeedback from './Givefeedback'
import TeacherFeedbcak from './TeacherFeedbcak'
import UniqueFeedback from './UniqueFeedback'
import AllPerformance from './AllPerformance'
import AdminContact from './admin/AdminContact'
import Contact from './Contact'
import Dashboard from './Dashboard'
import Editprofile from './Editprofile'
import ChangePassword from './ChangePassword'
import AdminRouteProtector from './AdminRouteProtector'
import UserRouteProtector from './UserRouteProtector'
import Thanks from './Thanks'
import NoThanks from './NoThanks'
import ActivateAccount from './ActivateAccount'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import { useEffect } from 'react'
import Cookies from 'universal-cookie'

function Siteroutes()
{
  const usercookie = new Cookies()
  const navi = useNavigate()
  const location = useLocation()

  useEffect(() =>
  {
    const cookieUser = usercookie.get("staysignin");
    if (cookieUser)
    {
      try
      {
        const publicPaths = ["/"];

        if (publicPaths.includes(location.pathname))
        {
          if (cookieUser.usertype === "admin")
          {
            navi("/adminhome");
          }
          else
          {
            navi("/");
          }
        }
      }
      catch (err)
      {
        console.error("Error parsing cookie user:", err);
      }
    }
  }, [location.pathname])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Authpage />}></Route>
        <Route path='/register' element={<Authpage />}></Route>
        <Route path='/adminhome' element={<AdminRouteProtector compname={AdminHome} />}></Route>
        <Route path='/adminuser' element={<AdminRouteProtector compname={Adminuser} />}></Route>
        <Route path='/feedback' element={<UserRouteProtector compname={Feedback} />}></Route>
        <Route path='/adminteacher' element={<AdminRouteProtector compname={AdminTeacher} />}></Route>
        <Route path='/addteacher' element={<AdminRouteProtector compname={AddTeacher} />}></Route>
        <Route path='/updateteacher' element={<AdminRouteProtector compname={UpdateTeacher} />}></Route>
        <Route path='/givefeedback' element={<UserRouteProtector compname={Givefeedback} />}></Route>
        <Route path="/Teachers_Feedback" element={<AdminRouteProtector compname={TeacherFeedbcak} />}></Route>
        <Route path="/getuniquefeedback" element={<AdminRouteProtector compname={UniqueFeedback} />}></Route>
        <Route path="/performance" element={<AdminRouteProtector compname={AllPerformance} />}></Route>
        <Route path="/admincontact" element={<AdminContact />}></Route>
        <Route path="/contact" element={<UserRouteProtector compname={Contact} />}></Route>
        <Route path="/dashboard" element={<UserRouteProtector compname={Dashboard} />}></Route>
        <Route path="/editprofile" element={<UserRouteProtector compname={Editprofile} />}></Route>
        <Route path="/changepassword" element={<UserRouteProtector compname={ChangePassword} />}></Route>
        <Route path="/activateaccount" element={<ActivateAccount />}></Route>
        <Route path="/thanks" element={<Thanks />}></Route>
        <Route path="/nothanks" element={<NoThanks />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>


      </Routes>
    </div >
  )
}

export default Siteroutes
