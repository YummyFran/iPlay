import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import moments from '../../assets/moments.svg'
import stats from '../../assets/stats.svg'
import visitors from '../../assets/visitors.svg'
import invite from '../../assets/invite.svg'
import contributions from '../../assets/contributions.svg'
import help from '../../assets/help.svg'
import settings from '../../assets/settings.svg'

const Options = () => {
  const optionsData = [
    {
      id: 1,
      icon: moments,
      label: "Moments",
      route: "moments",
    },{
      id: 2,
      icon: stats,
      label: "Stats",
      route: "stats",
    },{
      id: 3,
      icon: visitors,
      label: "Visitors",
      route: "visitors",
    },{
      id: 4,
      icon: invite,
      label: "Invite Friends",
      route: "invite",
    },{
      id: 5,
      icon: contributions,
      label: "Contributions",
      route: "contributions",
    },{
      id: 6,
      icon: help,
      label: "Help & Customer Service",
      route: "help",
    },{
      id: 7,
      icon: settings,
      label: "Settings",
      route: "settings",
    },
  ]

  const options = optionsData.map(el => {
    return (
      <Fragment key={el.id}>
        <Link to={el.route} key={el.id} className="option">
          <img src={el.icon} alt=' ' />
          <span>{el.label}</span> 
        </Link>
        {(el.id === 3 || el.id === 5) && <hr/>}
      </Fragment>
    )
  })
  return (
    <div className='options'>
      {options}
    </div>
  )
}

export default Options