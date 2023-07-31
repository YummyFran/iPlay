import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserData } from '../../hooks/iplay-db'

import vip from '../../assets/vip.svg'
import shop from '../../assets/shop.svg'
import playshow from '../../assets/playshow.svg'
import lovehome from '../../assets/lovehome.svg'
import { useUser } from '../../providers/UserProvider'
import Loading from '../Loading'

const ProfileHeader = () => {
    const [user, loading] = useUser()
    const [avatar, setAvatar] = useState()

    const links = [
        {
            icon: vip,
            text:'VIP Center',
            className: 'vipcenter',
        },{
            icon: shop,
            text:'Shop',
            className: 'shop'
        },{
            icon: playshow,
            text:'PLAY Show',
            className: 'playshow'
        },{
            icon: lovehome,
            text:'Love Home',
            className: 'lovehome'
        }
    ]

    const link = links.map((el, i) => {
        return (
            <Link to={el.className} key={i}>
                <div className={el.className}>
                    <img src={el.icon} alt={el.className} />
                    <span>{el.text}</span>
                </div>
            </Link>
        )
    })

    if(loading && !avatar) return <Loading />
    getUserData(user.uid)
        .then(res => setAvatar(res.defaultAvatar))


  return (
    <div className='profile-header'>
        <div className="profile-header--top" style={{backgroundImage: `url(${user.photoURL})`}}>
            <div className="dp">
                <img src={user.photoURL} alt={user.displayName} 
                className={avatar ? "default-avatar" : ""}/>
            </div>
            <div className="profile">
                <h2 className="name">{user.displayName}</h2>
                <div className="level">
                    <span>Lv.1</span>
                    <progress value='10' max='100'></progress>
                    <span>10/100</span>
                </div>
            </div>
        </div>
        <div className="header--links">
            {link}
        </div>
    </div>
  )
}

export default ProfileHeader