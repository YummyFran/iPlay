import React, { useState, useEffect } from 'react'
import { getUsers } from '../../hooks/iplay-db';
import { useUser } from '../../providers/UserProvider';

const Explore = () => {
    const [currUser] = useUser()
    const [newUsers, setNewUsers] = useState()

    console.log(currUser)
    useEffect(()=>{
        getUsers()
        .then(users => setNewUsers(users))
    }, [])

    return (
        <div className='explore'>
            <div className="explore--head">
                <h1>Explore</h1>
                <span>Enable GPS to explore more</span>
            </div>
            <div className="explore--list">
                {newUsers && newUsers.map(user => (
                    !(currUser.uid == user.uid) &&
                    <div className="explore--user">
                        <div className="profile">
                            <div className="display-picture" style={{
                                backgroundImage: `url(${user.photoURL})`,
                                backgroundSize: `${user.defaultAvatar ? '10rem': 'contain'}`,
                                backgroundPosition: 'center'
                            }}></div>
                            <div className="display-name">
                                <h3>{user.displayName}</h3>
                                <span>{user.bio}</span>
                            </div>
                        </div>
                    <div className="status">{user.status}</div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Explore