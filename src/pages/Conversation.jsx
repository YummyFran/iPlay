import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { getContact, updateChats } from '../hooks/iplay-db'
import { useUser } from '../providers/UserProvider'
import Header from '../components/Convo/Header'
import Chatbox from '../components/Convo/Chatbox'
import { db } from '../utils/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const Conversation = () => {
    const [message, setMessage] = useState("")
    const [user, setUser] = useState("")
    const [chats, setChats] = useState([])
    const [currUser, loading] = useUser()
    const {roomID} = useParams()

    const handleSend = async() => {
        setMessage("")
        if(message) {
            await updateChats(roomID, currUser, message)
        }
    }

    const handleChange = e => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [])

    useLayoutEffect(() => {
        if(!user) return
        const unsub =  onSnapshot(doc(db, "chats", roomID), res => {
          setChats(res.data())
        })
    
        return () => {
          unsub()
        }
      }, [user])

    useLayoutEffect(() => {
        console.log('uselayout')
        currUser && getContact(currUser, roomID).then(res => setUser(res))
    }, [loading])

    return (
        <div className='conversation'>
            <Header user={user}/>
            <div className="convo">
                {chats.messages?.map((el,i) => (
                    <div className={`chat ${el.senderUid === currUser.uid ? "sender" : "receiver"}`} key={i}>{el.text}</div>
                ))}
            </div>
            <Chatbox message={message} handleChange={handleChange} handleSend={handleSend} />
        </div>
    )
}

export default Conversation