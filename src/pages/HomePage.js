import './HomePage.css'
import ChatBox from '../components/ChatBox'
import Aside from '../components/Aside'
import { useEffect, useState } from 'react'





export default function HomePage() {
    const [currentChatId, setCurrentChatId] = useState("cgCqNRliXIm500NbswZT")
        
useEffect(() => {
    console.log(currentChatId)
},[currentChatId])

    return (
        <main className='Main'>
            <Aside setChatId={ setCurrentChatId }/>
            <ChatBox chatId={ currentChatId } />
        </main>
    )
    
}