import './HomePage.css'
import ChatBox from '../components/ChatBox'
import Aside from '../components/Aside'
import { useState } from 'react'

export default function HomePage() {
    const [currentChatId, setCurrentChatId] = useState("cgCqNRliXIm500NbswZT")

    return (
        <main className='Main'>
            <Aside />
            <ChatBox chatId={currentChatId} />
        </main>
    )
    
}