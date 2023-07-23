import React, { useState } from 'react'
import { auth } from '../../utils/firebase'
import { signOut } from 'firebase/auth'
import { useUser } from '../../providers/UserProvider'
import { getUserData } from '../../hooks/iplay-db'

import ranking from '../../assets/ranking.svg'
import cards from '../../assets/cards.svg'
import tasks from '../../assets/tasks.svg'
import friends from '../../assets/friends.svg'
import { Link } from 'react-router-dom'

const Header = () => {
    const [user, loading] = useUser()
    const [avatar, setAvatar] = useState()

    const links = [
        {
            icon: ranking,
            text:'Ranking',
            className: 'ranking',
        },{
            icon: cards,
            text:'Fun Cards',
            className: 'funcards'
        },{
            icon: tasks,
            text:'Tasks',
            className: 'tasks'
        },{
            icon: friends,
            text:'Friends',
            className: 'friends'
        }
    ]

    const link = links.map((el, i) => {
        return (
            <Link to={el.className} key={i}>
                <div className={el.className}>
                    <img src={el.icon} alt={el.className} />
                    <span>{el.text}</span>
                </div>
            </Link>
        )
    })
    
    getUserData(user)
        .then(res => setAvatar(res.defaultAvatar))

    if(loading) return <span>loading...</span>
    return (
        <div className='header'>
            <div className="header--top">
                <div className="header--profile">
                    <div className="img">
                        <img
                            src={user.photoURL} 
                            alt={`${user.displayName.split(' ')[0]}'s profile`}
                            className={avatar ? "default-avatar" : ""}
                        />
                    </div>
                    <p className="header--name">{user.displayName.split(' ')[0]}</p>
                </div>
                <div className="header--events">
                    <button onClick={() => signOut(auth)}>Log out</button>
                </div>
            </div>
            <div className="header--links">
                {link}
            </div>
        </div>
    )
}

export default Header