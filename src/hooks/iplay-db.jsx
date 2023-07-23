import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../utils/firebase"
import { useUser } from "../providers/UserProvider"

export const addUser = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        bio: "This user is new",
        status: "online"
    })
}

export const updateUser = async (user, credential) => {
    await updateDoc(    
        doc(db, "users", user.uid), {
        ...credential
    })
}

export const getUserData = async (user) => {
    const res = await getDoc(doc(db, "users", user.uid))
    return res.data()
}

// export const useUserData = async () => {
//     const [user, loading] = useUser()
//     const res = await getUserData(user)

//     return [ res, loading ]
// }