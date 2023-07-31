import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getUserData } from '../hooks/iplay-db'

import invite from '../assets/me.svg'
import chat from '../assets/chats.svg'

const UserProfile = () => {
    const [user, setUser] = useState()
    const { uid } = useParams()
    const back = useNavigate()

    window.scrollTo(0,0)

    useEffect(() => {
        getUserData(uid)
        .then(res => setUser(res))
    }, [])

    return (
        <div className='user-profile'>
            <div className="actions">
                <button className="add-friend" onClick={()=>console.log('Add Friend')}>
                    <img src={invite} alt="add-friend" />
                    Add Friend
                </button>
                <Link className="chat" to="/chats">
                    <img src={chat} alt="chat" />
                    Chat
                </Link>
            </div>
            <div className="top-options">
                <div onClick={() => back(-1)} className="back">{'<'}</div>
                <div className="menu">· · ·</div>
            </div>
            <div className="picture">
                <img src={user?.photoURL} alt="" />
            </div>
            <div className="wall container">
                <div className="about">
                    <div className="user-data">
                        <h2 className="name">{user?.displayName}</h2>
                        <div className="progress">
                            <div className="gender"></div>
                            <div className="level">Lv.1</div>
                            <div className="points">29</div>
                        </div>
                    </div>
                    <div className="geo-position">
                        <div className="distance">2.42km</div>
                        <div className="country">Philippines</div>
                    </div>
                </div>
                <div className="signature">
                    <h4>Signature</h4>
                    <p className="bio">{user?.bio}</p>
                </div>
                <div className="moments">
                    <div className="title">
                        <h4>Moments</h4>
                        <span className="total"></span>
                    </div>
                    <div className="moments-list"></div>
                </div>
                <div className="gift-wall">
                    <div className="title">
                        <h4>Gift Wall</h4>
                        <span className="total"></span>
                    </div>
                </div>
                <div className="guard">
                    <div className="title">
                        <h4>Guard</h4>
                    </div>
                </div>
                <div className="stats"></div>

            </div>
        </div>
    )
}

export default UserProfile