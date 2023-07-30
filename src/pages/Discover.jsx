import React, { useId } from 'react'
import { Link } from 'react-router-dom'

import family from '../assets/family.svg'
import church from '../assets/church.svg'
import mentorship from '../assets/mentorship.svg'
import interest from '../assets/interest.svg'
import nearby from '../assets/nearby.svg'
import voicematch from '../assets/voicematch.svg'

const Discover = () => {
  const todos = [
    {
      id: 1,
      icon: family,
      title: 'Family',
      to: 'family'
    },{
      id: 2,
      icon: church,
      title: 'Church',
      to: 'church'
    },{
      id: 3,
      icon: mentorship,
      title: 'Mentorship',
      to: 'mentorship'
    },{
      id: 4,
      icon: interest,
      title: 'Interest Group Chat',
      to: 'interestgc'
    },{
      id: 5,
      icon: nearby,
      title: 'Nearby',
      to: 'nearby'
    },{
      id: 6,
      icon: voicematch,
      title: 'Voice Match',
      to: 'voicematch'
    },
  ]

  const todo = todos.map((el, id) => {
    return (
      <Link to={el.to} className={`todo ${el.to}`} key={id}>
        <img src={el.icon} alt={el.to} />
        <span>{el.title}</span>
      </Link>
    )
  })

  return (
    <section className='discover container'>
      <h2>Discover</h2>
      <Link className="moments">
        <span>Moments</span>
      </Link>
      <div className="todos">
        {todo}
      </div>
    </section>
  )
}

export default Discover