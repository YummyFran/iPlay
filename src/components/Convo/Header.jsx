import React from 'react'
import { useNavigate } from 'react-router'

const Header = ({user}) => {
    const nav = useNavigate()

  return (
    <div className="top">
        <div onClick={() => nav(-1)} className="back">{'<'}</div>
        <span className="display-name">{user?.displayName}</span>
        <div className="menu">{'· · ·'}</div>
    </div>
  )
}

export default Header