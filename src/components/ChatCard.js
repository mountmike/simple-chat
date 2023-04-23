import { useEffect, useState } from "react"
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ChatCard({ conversationId, setChatId }) {
    const [chat, setChat] = useState({})
    
    useEffect(() => {
        const docRef = doc(db, "messages", conversationId );
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                setChat(docSnap.data());
            } 
    })
    },[])



    return (
        <article className="chat-wrapper" onClick={() => setChatId(conversationId)}>
            <img className="chat-img" src="https://placehold.co/400x400" alt="" />
            <div className="message-preview-wrapper">

                <h5 className="display-name">{chat.chat_name ? chat.chat_name : chat.members }</h5>

                <span className="message-preview">{chat.last_message}</span>
            </div>
        </article>
    )
}