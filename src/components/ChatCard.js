import { useEffect, useState } from "react"
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";

export default function ChatCard({ conversation, setChatId, setConversationList }) {
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
            let newArr = [...prevList].map(item => {
                if (item.id === conversation.id) {
                    return { id: item.id, isActive: true}
                } else {
                    return { id: item.id, isActive: false}
                }
              
            })
            console.log(newArr);
            return newArr
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
        </article>
    )
}