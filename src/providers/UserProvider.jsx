import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'

const UserContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}

const UserProvider = ({ children }) => {
    const [user, loading] = useAuthState(auth)

    return (
        <UserContext.Provider value={[user, loading]}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider