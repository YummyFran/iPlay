import React from 'react'
import { Navigate, Outlet } from 'react-router'

import NavBar from '../components/NavBar'
import { useUser } from '../providers/UserProvider'

const Layout = () => {
  const [user, loading] = useUser()

  if(!user) return <Navigate to="/login"/>
  return (
    <div>
        <Outlet />
        <NavBar />
    </div>
  )
}

export default Layout