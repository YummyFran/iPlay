import React from 'react'
import { Link } from 'react-router-dom'

const Games = () => {
    const games = [
        "space_warewolf",
        "mic_grab",
        "link_snap",
        "survival_challenge",
        "who's_the_spy",
        "crazy_alpaca",
        "guess_my_drawing",
        "defuse_master"
    ]

    const game = games.map((el,i) => {
        const gameName = el.split("_")
        return (
            <Link
                to={`games/${gameName.join("").replace(/[^a-zA-Z0-9]/g, "")}`} 
                className={ i < 2 ? "featured" : ""}
                key={i}
            >
                <div className={`game ${gameName.join("").replace(/[^a-zA-Z0-9]/g, "")}`}>{gameName.map(el => el.slice(0,1).toUpperCase() + el.slice(1)).join(" ")}</div>
            </Link>
        )
    })

  return (
    <div className='games'>
        <div className="games--head">
            <h2>Games</h2>
            <Link to='/gameroom'>Game Rooms</Link>
        </div>
        <div className="games--list">
            {game}
        </div>
    </div>
  )
}

export default Games