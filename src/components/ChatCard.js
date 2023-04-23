import { useEffect, useState } from "react"
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";

export default function ChatCard({ conversation, setChatId, setConversationList, users , uid , conversationId ,conversationList , setUpdateConvoList}) {
    const currentName = auth.currentUser.displayName.split(" ")[0]

    const conversationAvatar = () => {
        const chatMembers = users.filter(user => user.conversations.includes(conversation.id))
        const recipientUser = chatMembers.filter(index => index.id !== auth.currentUser.uid)[0]
        if (conversation.id === "theMegaChat") {
            return "/DALLE_avatar.png"
        } else if (recipientUser) {
            return recipientUser.avatar
        } else {
            return "https://placehold.co/400x400"
        }
    }

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



    return (
        <article className={conversation.isActive ? "chat-wrapper active" : "chat-wrapper"} onClick={handleClick}>
            <img className="chat-img" src={chat && conversationAvatar()} alt="" />
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