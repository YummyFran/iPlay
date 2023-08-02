import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { createChats, createContact, getChats, getUserData, updateContact } from '../hooks/iplay-db'

import invite from '../assets/me.svg'
import chat from '../assets/chats.svg'
import { useUser } from '../providers/UserProvider'

const UserProfile = () => {
    const [distance, setDistance] = useState()
    const [user, setUser] = useState()
    const [targetUser, setTargetUser] = useState()
    const [currUser] = useUser()
    const { uid } = useParams()
    const nav = useNavigate()

    const getDistance = (lat1, lon1, lat2, lon2) => {
        if([lat1,lon1,lat2,lon2].includes(null)) return NaN
        const earthRadiusKm = 6371;
        const toRadians = (degrees) => degrees * (Math.PI / 180);
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distanceKm = earthRadiusKm * c;
        return distanceKm;
    }

    const handleChat = async () => {
        console.log("chat clicked")
        const combinedId = currUser.uid > user.uid ? 
            currUser.uid + user.uid :
            user.uid + currUser.uid
        
        try {
            nav(`/chats/${combinedId}`)

            const res = await getChats(combinedId)
            const chatExist = res.exists()

            if(!chatExist) {
                console.log("creating")
                await createChats(combinedId)
                await createContact(currUser, user, combinedId)
            } else {
                await updateContact(currUser, combinedId)
            }
        } catch (err) {
            console.log(err)
        }
        
    }

    useEffect(() => {
        window.scrollTo(0,0)
        getUserData(uid)
        .then(res => setUser(res))
        
        currUser && getUserData(currUser.uid)
        .then(res => setTargetUser(res))
    }, [])

    useEffect(() => {
        
        if(user && targetUser){
            const km = getDistance(
                targetUser?.currentLocation?.lat, 
                targetUser?.currentLocation?.long,
                user?.currentLocation?.lat,
                user?.currentLocation?.long
            )
            
            setDistance(km.toFixed(2))
        }
    }, [targetUser, user])

    return (
        <div className='user-profile'>
            <div className="actions">
                <button className={currUser?.uid === uid ? 'send-gift' : 'add-friend'} onClick={()=>console.log('Add Friend')}>
                    <img src={invite} alt="add-friend" />
                    {currUser?.uid === uid ? 'Send Gift' : 'Add Friend'}
                </button>
                <button className="chat" onClick={() => currUser && user && handleChat()}>
                    <img src={chat} alt="chat" />
                    Chat
                </button>
            </div>
            <div className="top-options">
                <div onClick={() => nav(-1)} className="back">{'<'}</div>
                <div className="menu">{currUser?.uid === uid ? 'Edit' : '· · ·'}</div>
            </div>
            <div className="picture">
                <img src={user?.photoURL} alt="" />
            </div>
            <div className="wall container">
                <div className="about">
                    <div className="user-data">
                        <h2 className="name">{user?.displayName}</h2>
                        <div className="progress">
                            <div className="gender"></div>
                            <div className="level">Lv.1</div>
                            <div className="points">29</div>
                        </div>
                    </div>
                    <div className="geo-position">
                        <div className="distance">{!isNaN(distance) && (distance <= 0 ? "" : `${distance}km`)}</div>
                        <div className="country">Philippines</div>
                    </div>
                </div>
                <div className="signature">
                    <h4>Signature</h4>
                    <p className="bio">{user?.bio}</p>
                </div>
                <div className="moments">
                    <div className="title">
                        <h4>Moments</h4>
                        <span className="total"></span>
                    </div>
                    <div className="moments-list"></div>
                </div>
                <div className="gift-wall">
                    <div className="title">
                        <h4>Gift Wall</h4>
                        <span className="total"></span>
                    </div>
                </div>
                <div className="guard">
                    <div className="title">
                        <h4>Guard</h4>
                    </div>
                </div>
                <div className="stats"></div>

            </div>
        </div>
    )
}

export default UserProfile