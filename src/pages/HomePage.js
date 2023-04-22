import './HomePage.css'
import ChatBox from '../components/ChatBox'
import Aside from '../components/Aside'
import { useEffect, useState } from 'react'





export default function HomePage({ users }) {
    const [currentChatId, setCurrentChatId] = useState("cgCqNRliXIm500NbswZT")
        


    return (
        <main className='Main'>
            <Aside setChatId={ setCurrentChatId } users={ users }/>
            <ChatBox chatId={ currentChatId } />
        </main>
    )
    
}