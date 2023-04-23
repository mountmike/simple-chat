import './MessageHeader.css'
import { useEffect, useState } from "react"
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";

export default function MessageHeader({ chatId }) {


    // below code is copied from ChatCard.js and is a duplication of the db call there so we should consider refactoring

    const [conversation, setConversation] = useState(null)
    
    useEffect(() => {
        const docRef = doc(db, "messages", chatId );
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                setConversation(docSnap.data());
            } 
    })
    },[chatId])

    const conversationName = () => { 
        const currentName = auth.currentUser.displayName.split(" ")[0]
        return conversation.chat_name ? conversation.chat_name : conversation.members.filter(name => name !== currentName) 
    }

    return (
        <header className="Message-header">
            <img className="chat-img" src="https://placehold.co/400x400" alt="" />
            <h4>  {conversation ? conversationName() : "" }</h4>
           
        </header>
    )
}