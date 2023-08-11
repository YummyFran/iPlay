import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useUser } from '../providers/UserProvider'

import Loading from '../components/Loading'
import LoginButtons from '../components/LoginButtons'
import { updateUser } from '../hooks/iplay-db'

const Login = () => {
    const [user, loading] = useUser()
    const [error, setError] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        const email = e.target[0].value
        const password = e.target[1].value

        signInWithEmailAndPassword(auth, email, password)
        .then(creds => {
            const user = creds.user

            updateUser(user, {
                status: 'online'
            })
        })
        .catch((error) => {
            const errorCode = error.code;

            setError(errorCode)
        });
    }
    
    if (!loading && user) return <Navigate to='/'/>
    if (loading) return <Loading />

    return (
        <div className='login'>
            <div className="login--title">
                <h1>iPlay</h1>
                <p>Play & Socialize</p>
            </div>
            <form className='login--form' onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" autoComplete="on"/>
                <input type="password" placeholder="Password" autoComplete='on'/>
                <button>Log in</button>
                {error && <div className="errorMessage">
                    {error}
                </div>}
                <p>Don't have an account? <Link to="/signup" className='sign'>Sign up</Link></p>
            </form>
            <LoginButtons />
        </div>
    )
}

export default Login