import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useUser } from '../providers/UserProvider';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { addUser } from '../hooks/iplay-db'

import Loading from '../components/Loading';
import LoginButtons from '../components/LoginButtons';

const Signup = () => {
    const navigate = useNavigate()
    const [user, loading] = useUser(auth)
    const [error, setError] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        
        const username = e.target[0].value.slice(0,1).toUpperCase() + e.target[0].value.slice(1).toLowerCase()
        const email = e.target[1].value
        const password = e.target[2].value

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(res.user, {
                displayName: username
            })

            await addUser(res.user)
            navigate('/getstarted')
        } catch (err) {
            const errorCode = err.code
            setError(errorCode)
        }
    }
    
    if (user?.displayName) return <Navigate to='/'/>
    if (user || loading) return <Loading />
    
  return (
    <div className='login'>
        <div className="login--title">
            <h1>iPlay</h1>
            <p>Play & Socialize</p>
        </div>
        <form className='login--form' onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign up</button>
            {error && <div className="errorMessage">
                {error}
            </div>}
            <p>Already have an account? <Link to="/login" className='sign'>Log in</Link></p>
        </form>
        <LoginButtons />
    </div>
  )
}

export default Signup