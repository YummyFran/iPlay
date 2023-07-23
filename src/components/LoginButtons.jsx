import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, google as gProvider } from '../utils/firebase'
import { addUser } from '../hooks/iplay-db'

import google from '../assets/google.svg'
import facebook from '../assets/facebook.svg'

const LoginButtons = () => {

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, gProvider)
        .then((res)=> {
            addUser(res.user)
        })
    }

  return (
    <div className="login--buttons">
        <button onClick={handleGoogleSignIn}>
            <img src={google} alt="google" title='Continue with google'/>
        </button>
        <button>
            <img src={facebook} alt="facebook" title='Continue with facebook'/>
        </button>
    </div>
  )
}

export default LoginButtons