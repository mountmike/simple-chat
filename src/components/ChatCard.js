import { useEffect, useState } from "react"
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";

export default function ChatCard({ conversation, setChatId, setConversationList , uid , conversationId ,conversationList , setConvoList}) {
    const currentName = auth.currentUser.displayName.split(" ")[0]

    const conversationName = () => { 
        return chat.chat_name ? chat.chat_name : chat.members.filter(name => name !== currentName) 
    }

    const [chat, setChat] = useState(null)
    
    useEffect(() => {
        const docRef = doc(db, "messages", conversation.id );
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                setChat(docSnap.data());
            } 
    })
    },[])

    const handleClick = (e) => {
        setChatId(conversation.id)
        setConversationList(prevList => {
            let newArr = prevList.map(item => {
                if (item.id === conversation.id) {
                    return { id: item.id, isActive: true}
                } else {
                    return { id: item.id, isActive: false}
                }
              
            })
            return newArr
        })

    }
    
    const deleteChat = () => {
        let updatedConversationArr = conversationList.map( convo => convo.id).filter( c => c !== conversationId)
        
        const docRef = doc(db, "users", uid);
        const data = {
          conversations: updatedConversationArr
        };

        updateDoc(docRef, data)
        .then(docRef => {
            console.log("A New Document Field has been added to an existing document");
        })
    }

    
    

    return (
        <article className={conversation.isActive ? "chat-wrapper active" : "chat-wrapper"} onClick={handleClick}>
            <img className="chat-img" src="https://placehold.co/400x400" alt="" />
            <div className="message-preview-wrapper">
                <h5 className="display-name">
                    {chat ? conversationName() : "" }
                </h5>
                <span className="message-preview">{chat ? chat.last_message : "" }</span>
            </div>
            <div className="time-received-wrapper">
                <time className="time-sent">{chat ? Date(chat.last_message_date).toString().slice(0,3) : "" } </time>
                <button className="delete-btn" onClick={deleteChat}>Delete Chat</button>
            </div>
        </article>
    )
}