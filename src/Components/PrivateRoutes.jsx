import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../Utils/AuthContext'

const PrivateRoutes = () => {
    const {user} = useAuth()

  return (
    <>
    {user && user.emailVerification === true ? <Outlet/> : user && user.emailVerification === false ? <Navigate to='/verifyemail'/> : <Navigate to='/login'/> }
    </>
  )
}

export default PrivateRoutes