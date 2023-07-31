import { 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    collection, 
    getDocs, 
    limit, 
    query, 
    orderBy, 
    serverTimestamp,
} from "firebase/firestore"
import { db } from "../utils/firebase"

export const addUser = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        bio: "This user is new",
        status: "online",
        createdAt: serverTimestamp(),
    })
}

export const updateUser = async (user, credential) => {
    await updateDoc(    
        doc(db, "users", user.uid), {
        ...credential
    })
}

export const getUserData = async (user) => {
    const res = await getDoc(doc(db, "users", user))
    return res.data()
}

export const getUsers = async () => {
    const q = query(collection(db, "users"), limit(20), orderBy('createdAt', 'desc'))
    const snapShot = await(getDocs(q))

    let users = []

    snapShot.forEach(doc => {
        users.push(doc.data())
    })

    return users
}