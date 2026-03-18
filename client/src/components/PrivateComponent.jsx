import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAdminstatus from '../hooks/useAdminstatus';

const PrivateComponent = ({children}) => {
    const {isAdmin, isAuth} = useAdminstatus();
    console.log(isAdmin)
    if(!isAuth){
       return <h1>Checking the user.....</h1>
    }

    return isAdmin ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateComponent