import React, { useEffect, useLayoutEffect, useState } from 'react'
import contacts from '../assets/contacts.svg'
import plus from '../assets/plus.svg'
import { useUser } from '../providers/UserProvider'
import { db } from '../utils/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'

const Chats = () => {
  const [user] = useUser()
  const [chats, setChats] = useState()
  const nav = useNavigate()

  useQuery({
    queryKey: ['chats'],
    queryFn: () => onSnapshot(
      doc(db, "contacts", user.uid), 
      res => setChats(res.data())
    )
  })

  if(chats == undefined) return 'loading...'

  return (
    <section className='chats container'>
      <div className="chats--top">
        <h2>Chats</h2>
        <img src={contacts} alt="contacts"/>
        <img src={plus} alt="add" />
      </div>
      <div className="chat-list">
        {chats !== undefined && Object.entries(chats).sort((a,b) => b[1].date - a[1].date).map(contact => (
          <div className="contact" key={contact[1].uid} onClick={() => nav(`${contact[0]}`)}>
            <div className="dp">
              <img src={contact[1].photoURL} className={contact[1].photoURL?.search("firebasestorage") > 0 ? "default-avatar" : ""} alt='av'/>
            </div>
            {contact[1].nickname ? contact[1].nickname : contact[1].displayName}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Chats