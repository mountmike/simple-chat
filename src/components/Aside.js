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
    const [ time , setTime ] = useState()

    //  conversationList should be an array of objects with all relevant info for a chat card. To do this, in the database each conversation should be a document in a collection "conversations" stored under each user.

    useEffect(() => {
        const docRef = doc(db, "users", uid );
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const conversationList = docSnap.get("conversations")
                    .map((convo, index) => {
                        let obj = {}
                        obj.id = convo
                        index === 0 ? obj.isActive = true : obj.isActive = false // setting first card in the array to be active by default
                        return obj
                    })
            setConversationList(conversationList.reverse())}
        })
        console.log("updating convo list");
    },[updateConvoList])
    
    let convoList = []

    if(conversationList){
        conversationList.map( convo => {
            const docRef = doc(db, "messages", convo.id );
            getDoc(docRef).then(docSnap => {
                if (docSnap.exists()) {
                    // let date = docSnap.data().last_message_date.toDate().toDateString().split(' ').slice(1).join(' ') + ',' + docSnap.data().last_message_date.toDate().toLocaleTimeString()
                    convoList+= (docSnap.data().last_message_date.toDate().valueOf());
                } 
                })
        })
        //setTime(convoList)
       
    }
    // useEffect (() => console.log(time),[time])    

    
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
                   users={users}
                   />
                ))}

            </section>
        </aside>
    )
}