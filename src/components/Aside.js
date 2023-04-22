import "./Aside.css"
import { auth } from "../firebase";
import ChatCard from './ChatCard'
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";


export default function Aside() {
    const { uid, displayName, photoURL } = auth.currentUser;
    const [conversationList, setConversationList] = useState()

    useEffect(() => {
        const docRef = doc(db, "users2", uid );
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                setConversationList(docSnap.data().conversations)
            } else {
                console.log("No such document!");
            }
    })
    },[])

    if(conversationList){console.log(conversationList)}
    
    
    
    
    return (
        <aside className="Aside">
            <header>
                <section className="currentUser">
                    <img className="display-img" src={photoURL} alt="" />
                    <h4 className="display-name">{displayName}</h4>
                </section>
                <button>new chat</button>
            </header>
            <section className="search-bar">
                <input placeholder="Search" type="text" name="" id="" />
            </section>
            <section className="chat-list">
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
            </section>
        </aside>
    )
}