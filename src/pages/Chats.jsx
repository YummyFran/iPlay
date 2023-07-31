import React, { useState } from 'react'
import contacts from '../assets/contacts.svg'
import plus from '../assets/plus.svg'

const Chats = () => {
  const [chats, setChats] = useState([])



  return (
    <section className='chats container'>
      <div className="chats--top">
        <h2>Chats</h2>
        <img src={contacts} alt="contacts"/>
        <img src={plus} alt="add" />
      </div>
      <div className="chat-list">
        
      </div>
    </section>
  )
}

export default Chats