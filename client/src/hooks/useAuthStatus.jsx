import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useAuthStatus = () => {
    const {user} = useSelector(state=>state.auth)
    const [isAuth,setIsAuth] = useState(false)
    useEffect(()=>{
        user? setIsAuth(true): setIsAuth(false)
    },[user])
  return {isAuth}
}

export default useAuthStatus