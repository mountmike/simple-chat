import './HomePage.css'
import ChatBox from '../components/ChatBox'
import Aside from '../components/Aside'
import { useState } from 'react'
import { GetUsers, RegisterUser } from '../user'
import { auth } from "../firebase";
import { useEffect } from 'react';




export default function HomePage() {
    const [currentChatId, setCurrentChatId] = useState("cgCqNRliXIm500NbswZT")
    const [ users , setUsers ] = useState()
    const { uid } = auth.currentUser
    
    useEffect(() => {
        GetUsers(setUsers)
    },[])    
        
    if(users){
        if(!users.map(user => (user.id)).includes(uid)){
            RegisterUser()
        }
    }        
    

    return (
        <main className='Main'>
            <Aside setChat={setCurrentChatId}/>
            <ChatBox chatId={currentChatId} />
        </main>
    )
    
}