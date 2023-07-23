import React from 'react'
import { NavLink } from 'react-router-dom'

import games from '../assets/games.svg'
import voice from '../assets/voice.svg'
import chats from '../assets/chats.svg'
import discover from '../assets/discover.svg'
import me from '../assets/me.svg'

const NavBar = () => {
  return (
    <nav className='navbar'>
        <NavLink to="/" className={({isActive}) => isActive ? 'active-link' : ""}>
            <div className="iplay">
                <img src={games} alt="iplay" />
                <span>iPlay</span>
            </div>
        </NavLink>
        <NavLink to='/voicerooms' className={({isActive}) => isActive ? 'active-link' : ""}>
            <div className="voiceroom">
                <img src={voice} alt="voice" />
                <span>Voice</span>
            </div>
        </NavLink>
        <NavLink to='chats' className={({isActive}) => isActive ? 'active-link' : ""}>
            <div className="chats">
                <img src={chats} alt="chats" />
                <span>Chats</span>
            </div>
        </NavLink>
        <NavLink to='discover' className={({isActive}) => isActive ? 'active-link' : ""}>
            <div className="discover">
                <img src={discover} alt="discover" />
                <span>Discover</span>
            </div>
        </NavLink>
        <NavLink to='profile' className={({isActive}) => isActive ? 'active-link' : ""}>
            <div className="profile">
                <img src={me} alt="me" />
                <span>Me</span>
            </div>
        </NavLink>
    </nav>
  )
}

export default NavBar