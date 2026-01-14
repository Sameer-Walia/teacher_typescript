import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Siteroutes from './components/Siteroutes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './reduxslices/authSlice';
import CommonHeader from './components/CommonHeader';
import { AppDispatch, RootState } from './store';
import Cookies from 'universal-cookie';

function App()
{
  const dispatch = useDispatch<AppDispatch>()

  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const usercokkie = new Cookies()


  useEffect(() =>
  {
    const data = sessionStorage.getItem("userdata");
    if (data)
    {
      dispatch(login(JSON.parse(data)));
    }
  }, []);

  useEffect(() =>
  {
    const cookieUser = usercokkie.get("staysignin");
    if (cookieUser)
    {
      dispatch(login(cookieUser))
      sessionStorage.setItem("userdata", JSON.stringify(cookieUser));
    }
  }, []);

  return (
    <div>
      {
        isLoggedIn === false ? <Header /> : <CommonHeader />
      }
      <Siteroutes />
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
