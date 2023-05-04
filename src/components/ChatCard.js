import { createContext, useEffect, useState } from "react"
import { db } from "../firebase";
import { doc, deleteDoc, Timestamp } from "firebase/firestore";
import { auth } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function ChatCard({ conversation, setChatId, setConversationList, users, currentChatId }) {
    const { uid } = auth.currentUser;

    const handleClick = (e) => {
        setChatId(conversation.id)
    }

    const conversationName = () => { 
        const currentName = auth.currentUser.displayName.split(" ")[0]
        return conversation.chat_name ? conversation.chat_name : conversation.members.filter(name => name !== currentName) 
    }

    const conversationAvatar = () => {
        const recipientId = conversation.membersId.filter(id => id !== uid)
        const recipientUser = users.filter(user => user.id == recipientId)[0]
        if (conversation.id === "theMegaChat") {
            return "/DALLE_avatar.png"
        } else if (recipientUser) {
            return recipientUser.avatar
        } else {
            return "https://placehold.co/400x400"
        }
    }

    const deleteChat = async () => {
        await deleteDoc(doc(db, 'messages', conversation.id));
    }

    const timestamp = () => {
        // let date;
        // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        // let timePast = (Timestamp.now()).toDate().getDay() - conversation.last_message_date.toDate().getDay()
        // if (timePast > 6 ){
        //     date = conversation.last_message_date.toDate().toDateString()
        // } else if (timePast > 0 ){
        //     let time = conversation.last_message_date.toDate().toLocaleTimeString().split(':')
        //     time.pop()
        //     date = conversation.last_message_date.toDate().toDateString().split(' ')[0]
        //     date = /* time .join(':') + " " + */  date
        // } else {
        //     date = conversation.last_message_date.toDate().toLocaleTimeString().split(':')
        //     date.pop()
        //     date = /*'Today ' + */date.join(':')
        // }
        // return date
    }
    
    
    return (
        <article className={currentChatId === conversation.id ? "chat-wrapper active" : "chat-wrapper"} onClick={handleClick} >
            <div className="card-left-wrapper">
                <img className="chat-img" src={conversationAvatar()} alt="" />
                <div className="message-preview-wrapper">
                    <h5 className="display-name">
                        {conversationName()}
                    </h5>
                    <span className="message-preview">{conversation.last_message}</span>
                </div>
            </div>
            <div className="card-right-wrapper">
                {conversation.id !== "theMegaChat" ?
                <button id="deleteChatBtn" onClick={deleteChat}>
                        <FontAwesomeIcon icon={faXmark} />
                </button>
                :
                null }
                <div className="time-received-wrapper">
                    <time className="time-sent">{timestamp()}</time>
                </div>
            </div>
        </article>
    )
}