import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

const useAdminstatus = () => {
    const {user} = useSelector((state) => state.auth);
    console.log(user)
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        user?.role === "admin"? setIsAdmin(true): setIsAdmin(false);
        setIsAuth(true);
    }, [user]);
    return { isAdmin, isAuth };
}

export default useAdminstatus