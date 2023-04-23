import "./Aside.css"
import { auth } from "../firebase";
import ChatCard from './ChatCard'
import { ChooseRecipient } from "./ChooseRecipient";
import ProfileHeader from './ProfileHeader'
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { query, collection, orderBy, onSnapshot, limit} from "firebase/firestore";



export default function Aside({ setChatId , users }) {
    const { uid, displayName, photoURL } = auth.currentUser;
    const [conversationList, setConversationList] = useState([]) // list of user conversations id
    const [isNewChat, setIsNewChat] = useState(false) // for toggling the conditional rendering of the new chat ID input
    const [updateConvoList , setUpdateConvoList] = useState(false)
    
    useEffect(() => {
        const docRef = doc(db, "users", uid );
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const conversationList = docSnap.data().conversations
                    .map((convo, index) => {
                        let obj = {}
                        obj.id = convo
                        index === 0 ? obj.isActive = true : obj.isActive = false
                        return obj
                    })
            setConversationList(conversationList.reverse())}
        })
    },[updateConvoList])



    
    return (
        <aside className="Aside">
            <ProfileHeader setChatId={setChatId}  users={users} setIsNewChat={setIsNewChat}/>

           {isNewChat && <ChooseRecipient setIsNewChat={setIsNewChat} setUpdateConvoList={setUpdateConvoList}/>}

            <section className="chat-list">
                
                {conversationList?.map((conversation) => (
                   
                   <ChatCard 
                   key={conversation.id} 
                   conversation={conversation} 
                   setChatId={setChatId} 
                   setConversationList={setConversationList}
                   conversationId={conversation.id}
                   uid={uid}
                   conversationList={conversationList}
                   setUpdateConvoList={setUpdateConvoList}
                   />
                ))}

            </section>
        </aside>
    )
}