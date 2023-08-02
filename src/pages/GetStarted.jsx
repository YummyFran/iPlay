import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { updateProfile } from 'firebase/auth'
import { useUser } from '../providers/UserProvider'
import { updateContactPhoto, updateUser } from '../hooks/iplay-db'

import Loading from '../components/Loading'
import Avatars from '../components/GetStarted/Avatars'

const GetStarted = () => {
    const [user, loading] = useUser()
    const [isDisabled, setIsDisabled] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState()
    const navigate = useNavigate()
    console.log("rendered get started")
    const avatars = [
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_00_delay-0.4s.gif?alt=media&token=871ec1fa-9186-413f-8e4f-21177d4be1da',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_01_delay-0.4s.gif?alt=media&token=9f5243f1-077b-41c9-8879-4be12710a503',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_02_delay-0.4s.gif?alt=media&token=6ba763ba-4458-4589-98ee-9511fba79b73',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_03_delay-0.4s.gif?alt=media&token=b18ee1f8-eeca-4f08-8ef3-ba4ab5c6b9a8',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_04_delay-0.4s.gif?alt=media&token=1d0e1155-b889-48d3-84c2-c5aabf3e47c8',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_05_delay-0.4s.gif?alt=media&token=6d9cbdb3-2dab-45b5-ba4a-e800f594cb94',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_06_delay-0.4s.gif?alt=media&token=28df4435-b8a8-464e-bfef-c3878217bb20',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_07_delay-0.4s.gif?alt=media&token=056e8497-0a9a-4a76-8619-2d767b9d1eb7',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_08_delay-0.4s.gif?alt=media&token=f0d902b3-caed-4a15-a241-2e6539ce43ab',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_09_delay-0.4s.gif?alt=media&token=66134af3-739c-413f-a7da-2c3be8110210',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_10_delay-0.4s.gif?alt=media&token=bab3f662-3bbc-47fa-a5dc-da89d9869e37',
        'https://firebasestorage.googleapis.com/v0/b/iplay-d39eb.appspot.com/o/frame_11_delay-0.4s.gif?alt=media&token=14d2df77-6809-4f98-b712-cb425b1eb51f'
    ]

    const avatar = avatars.map((el, i) => {
        return <Avatars el={el} i={i} key={i}/>
    })

    const handleOnChange = e => {
        const id = e.target.id.split("_")[1]
        id && setIsDisabled(false)

        setSelectedAvatar(Number(id))
    }

    const handleClick = async () => {
        try {
            await updateProfile(user, {
                photoURL: avatars[selectedAvatar]
            })
    
            await updateUser(user, {
                photoURL: avatar[selectedAvatar].props.el,
                defaultAvatar: true
            })

            await updateContactPhoto(user)
            
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    if(loading) return <Loading />
    if(!user) return <Navigate to="/login"/>
    // if(user?.photoURL != null) return <Navigate to="/"/>

    return (
        <div className='getstarted'>
            <div className="getstarted--title">
                <h1>Greetings {user.displayName.split(' ')[0]}!!</h1>
                <p>Select an avatar to get started!</p>
            </div>
            <form onChange={handleOnChange}>
                {avatar}
                <label htmlFor="dp" className='upload'>Upload an Avatar</label>
                <input type="file" id="dp" name='dpa'/>
            </form>
            <button disabled={isDisabled} onClick={handleClick}>Get Started</button>
        </div>
    )
}

export default GetStarted