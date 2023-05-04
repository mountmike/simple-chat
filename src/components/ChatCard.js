import { useEffect, useState } from "react"
import { db } from "../firebase";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function ChatCard({ conversation, setChatId, setConversationList, users, conversationList , setUpdateConvoList}) {
    const { uid } = auth.currentUser;

    const handleClick = (e) => {
        setChatId(conversation.id)
        setConversationList(prevList => {
            let newArr = prevList.map(item => {
                if (item.id === conversation.id) {
                    return { ...item, isActive: true}
                } else {
                    return { ...item, isActive: false}
                }
              
            })
            return newArr
        })
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
            console.log(recipientUser.avatar);
            return recipientUser.avatar
            
        } else {
            return "https://placehold.co/400x400"
        }
    }
    
    return (
        <article className={conversation.isActive ? "chat-wrapper active" : "chat-wrapper"} onClick={handleClick} >
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
                <button id="deleteChatBtn" >
                        <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="time-received-wrapper">
                    <time className="time-sent">  </time>
                </div>
            </div>
        </article>
    )
}