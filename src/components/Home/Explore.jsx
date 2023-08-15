import React, { useState, useEffect } from 'react'
import { getUsers } from '../../hooks/iplay-db';
import { useUser } from '../../providers/UserProvider';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Explore = () => {
    const [currUser] = useUser()

    const {data: newUsers, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers()
    })

    if(isLoading) return 'loading...'

    return (
        <div className='explore'>
            <div className="explore--head">
                <h1>Explore</h1>
                <span>Enable GPS to explore more</span>
            </div>
            <div className="explore--list">
                {newUsers && newUsers.map(user => (
                    !(currUser.uid === user.uid) &&
                    <Link to={`user/${user.uid}`} key={user.uid}>
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
                            <div className={`status ${user.status}`}>{user.status}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Explore