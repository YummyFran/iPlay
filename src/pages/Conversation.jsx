import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import game from '../assets/games.svg'
import more from '../assets/plus.svg'
import mic from '../assets/mic.svg'
import { getContact } from '../hooks/iplay-db'
import { useUser } from '../providers/UserProvider'

const Conversation = () => {
    const [message, setMessage] = useState("")
    const [user, setUser] = useState("")
    const [currUser] = useUser()
    const {roomID} = useParams()
    const nav = useNavigate()

    const handleChange = e => {
        setMessage(e.target.value)
    }
    
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [])

    useEffect(() => {
        currUser && getContact(currUser, roomID).then(res => setUser(res))
    }, [currUser])

    return (
        <div className='conversation'>
            <div className="top">
                <div onClick={() => nav(-1)} className="back">{'<'}</div>
                <span className="display-name">{user?.displayName}</span>
                <div className="menu">{'· · ·'}</div>
            </div>
            <div className="convo"></div>
            <div className="bottom">
                <div className="mic">
                    <img src={mic} alt="" />
                </div>
                <input type="text" placeholder='Message' onChange={handleChange} value={message}/>
                <div className="mini-games">
                    <img src={game} alt="" />
                </div>
                <div className={`more ${message.length > 0 ? 'send' : ''}`}>
                    {message.length > 0 ? 
                    <button>Send</button>: 
                    <img src={more}/>}
                </div>
            </div>
        </div>
    )
}

export default Conversation