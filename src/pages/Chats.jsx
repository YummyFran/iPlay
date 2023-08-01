import React, { useLayoutEffect, useState } from 'react'
import contacts from '../assets/contacts.svg'
import plus from '../assets/plus.svg'
import { getContact } from '../hooks/iplay-db'
import { useUser } from '../providers/UserProvider'
import { db } from '../utils/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const Chats = () => {
  const [user] = useUser()
  const [chats, setChats] = useState()

  // console.log(chats)
  
  useLayoutEffect(() => {
    if(!user) return
    const unsub =  onSnapshot(doc(db, "contacts", user.uid), res => {
      setChats(res.data())  
    })

    return () => {
      unsub()
    }
  }, [user])

  return (
    <section className='chats container'>
      <div className="chats--top">
        <h2>Chats</h2>
        <img src={contacts} alt="contacts"/>
        <img src={plus} alt="add" />
      </div>
      <div className="chat-list">
        {chats != undefined && Object.entries(chats).sort((a,b) => a[1].date - b[1].date).map(contact => (
          <div className="contact" key={contact[1].uid}>
            <div className="dp">
              <img src={contact[1].photoURL} alt="" />
            </div>
            {contact[1].displayName}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Chats