import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface UserRouteProtectorProps
{
  compname: React.ComponentType;
}


// const UserRouteProtector: React.FC<UserRouteProtectorProps> = ({ compname: Component }) => 
function UserRouteProtector({ compname: Component }: UserRouteProtectorProps)

{

  const navigate = useNavigate()

  useEffect(() =>
  {
    if (sessionStorage.getItem("userdata") === null)
    {
      navigate("/login")
      toast.error("please login to access the page")
    }
  }, [])

  return (
    <div>
      <Component />
    </div>
  )
}

export default UserRouteProtector
