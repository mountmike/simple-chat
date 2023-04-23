import { useEffect, useState } from "react"
import { db } from "../firebase";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

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
    
    const deleteChat = () => {
        let updatedConversationArr = conversationList.map( convo => convo.id).filter( c => c !== conversationId)
        
        const docRef = doc(db, "users", uid);
        const data = {
          conversations: updatedConversationArr
        };

        updateDoc(docRef, data)
        setUpdateConvoList( prev => !prev)
    }
    let date

    //var timeStamp = new Timestamp()
    if(chat){
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let timePast = (Timestamp.now()).toDate().getDay() - chat.last_message_date.toDate().getDay()
        if (timePast > 6 ){
            date = chat.last_message_date.toDate().toDateString()
        } else if (timePast > 0 ){
            let time = chat.last_message_date.toDate().toLocaleTimeString().split(':')
            time.pop()
            date = chat.last_message_date.toDate().toDateString().split(' ')[0]
            date = /* time .join(':') + " " + */  date
        } else {
            date = chat.last_message_date.toDate().toLocaleTimeString().split(':')
            date.pop()
            date = /*'Today ' + */date.join(':')
        }
    }




    return (
        <article className={conversation.isActive ? "chat-wrapper active" : "chat-wrapper"} onClick={handleClick}>
            <div className="card-left-wrapper">
                <img className="chat-img" src={chat && conversationAvatar()} alt="" />
                <div className="message-preview-wrapper">
                    <h5 className="display-name">
                        {chat ? conversationName() : "" }
                    </h5>
                    <span className="message-preview">{chat ? chat.last_message : "" }</span>
                </div>
            </div>
            <div className="card-right-wrapper">
                <button id="deleteChatBtn" onClick={deleteChat}>
                        <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="time-received-wrapper">
                    <time className="time-sent">{chat ? date : "" } </time>
                </div>
            </div>
        </article>
    )
}