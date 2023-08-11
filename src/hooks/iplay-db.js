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
    arrayUnion,
    Timestamp,
} from "firebase/firestore"
import { db } from "../utils/firebase"

export const addUser = async (user) => {
    const position = user.photoURL?.search('=s96')
    const dp = user.photoURL != null ?
        user.photoURL.slice(0, position + 2) + '200' + user.photoURL.slice(position + 4) :
        user.photoURL
    let location = {
        lat: null,
        long: null
    }

    try {
        const pos = await new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej, {
                enableHighAccuracy : true,
                timeout: 15 * 1000
            })
        })

        location = {  
            lat: pos.coords.latitude,
            long: pos.coords.longitude
        }
    
    } catch (err) {
        console.log(err)
    }

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: dp,
        bio: "This user is new",
        status: "online",
        createdAt: serverTimestamp(),
        currentLocation: location
    })

    await setDoc(doc(db, "chats", user.uid+user.uid), {
        messages: []
    })

    await setDoc(doc(db, "contacts", user.uid), {
        [`${user.uid}${user.uid}`]: {
            uid: user.uid,
            displayName: user.displayName,
            nickname: "Just You",
            photoURL: dp,
            date: serverTimestamp()
        }
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

export const createChats = async (combinedId) => {
    await setDoc(doc(db, "chats", combinedId), {
        messages: []
    })
}

export const getChats = async (combinedId) => {
    const res = await getDoc(doc(db, "chats", combinedId))
    return res
}

export const updateChats = async (combinedId, currentUser, text) => {
    await updateDoc(doc(db, "chats", combinedId), {
        messages: arrayUnion({
            time: Timestamp.now(),
            senderUid: currentUser?.uid || null,
            text
        })
    })
}

export const createContact = async (currentUser, user, combinedId) => {
    await updateDoc(doc(db, "contacts", currentUser.uid), {
        [combinedId]: {
            uid: user.uid,
            displayName: user.displayName,
            nickname: "",
            photoURL: user.photoURL,
            date: serverTimestamp()
        }
    })
}

export const getContact = async (currentUser, combinedId) => {
    const res = await getDoc(doc(db, "contacts", currentUser.uid))
    return res.data()[combinedId]
}

export const updateContact = async (currentUser, combinedId, nickname = "") => {
    await updateDoc(doc(db, "contacts", currentUser.uid), {
        [`${combinedId}.date`] : serverTimestamp(),
        [`${combinedId}.nickname`] : nickname
    })
}

export const updateContactPhoto = async (currentUser) => {
    await updateDoc(doc(db, "contacts", currentUser.uid), {
        [`${currentUser.uid}${currentUser.uid}.photoURL`] : currentUser.photoURL
    })
}