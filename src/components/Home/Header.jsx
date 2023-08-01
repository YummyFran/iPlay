import React, { useLayoutEffect, useState } from 'react'
import { auth } from '../../utils/firebase'
import { signOut } from 'firebase/auth'
import { useUser } from '../../providers/UserProvider'
import { getUserData } from '../../hooks/iplay-db'
import { Link } from 'react-router-dom'

import ranking from '../../assets/ranking.svg'
import cards from '../../assets/cards.svg'
import tasks from '../../assets/tasks.svg'
import friends from '../../assets/friends.svg'

const Header = () => {
    const [user, loading] = useUser()
    const [currUser, setCurrUser] = useState(null)

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

    useLayoutEffect(() => {
        getUserData(user.uid)
            .then(res => setCurrUser(res))
    }, [])
    
    return (
        <div className='header'>
            <div className="header--top">
                <div className="header--profile">
                    <Link to={`user/${currUser?.uid}`} className="img">
                        <img
                            src={currUser ? currUser?.photoURL : user.photoURL} 
                            alt={`${currUser?.displayName.split(' ')[0]}'s profile`}
                            className={currUser?.defaultAvatar ? "default-avatar" : ""}
                        />
                    </Link>
                    <p className="header--name">{(currUser ? currUser : user).displayName.split(' ')[0]}</p>
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