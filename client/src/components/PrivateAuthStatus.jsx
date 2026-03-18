import React from 'react'
import useAuthStatus from '../hooks/useAuthStatus'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateAuthStatus = () => {
    const {isAuth}=useAuthStatus()
    if(!isAuth){
        return <h1>Checking the user.....</h1>
    }
  return isAuth?<Outlet/>:<Navigate to={'/login'}/>
}

export default PrivateAuthStatus