import "./Aside.css"
import { auth } from "../firebase";
import ChatCard from './ChatCard'
import ProfileHeader from './ProfileHeader'
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";


export default function Aside({ setChatId }) {
    const { uid, displayName, photoURL } = auth.currentUser;
    const [conversationList, setConversationList] = useState() // list of user conversations id
    

    
    useEffect(() => {
        const docRef = doc(db, "users2", uid );
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                setConversationList(docSnap.data().conversations)
            } 
    })
    },[])

    
    
    return (
        <aside className="Aside">
            <ProfileHeader setChatId={setChatId} />
            <section className="search-bar">
                <input placeholder="Search" type="text" name="" id="" />
            </section>
            <section className="chat-list">
                
                {conversationList?.map((conversationId) => (
                   
                   <ChatCard key={conversationId.id} conversation={conversationId} setChatId={ setChatId } />
                ))}

            </section>
        </aside>
    )
}