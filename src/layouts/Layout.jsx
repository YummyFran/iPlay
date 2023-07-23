import React from 'react'
import { Outlet } from 'react-router'

import NavBar from '../components/NavBar'

const Layout = () => {
  return (
    <div>
        <Outlet />
        <NavBar />
    </div>
  )
}

export default Layout