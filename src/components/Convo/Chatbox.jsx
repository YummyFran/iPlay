import React from 'react'

import game from '../../assets/games.svg'
import more from '../../assets/plus.svg'
import mic from '../../assets/mic.svg'

const Chatbox = ({message, handleChange, handleSend}) => {
  return (
    <form className="bottom" onSubmit={handleSend}>
        <div className="mic">
            <img src={mic} alt="mic" />
        </div>
        <input type="text" placeholder='Message' onChange={handleChange} value={message}/>
        <div className="mini-games">
            <img src={game} alt="game" />
        </div>
        <div className={`more ${message.length > 0 ? 'send' : ''}`}>
            {message.length > 0 ? 
            <button onClick={handleSend}>Send</button>: 
            <img src={more} alt='more'/>}
        </div>
    </form>
  )
}

export default Chatbox