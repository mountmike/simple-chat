import './HomePage.css'
import ChatBox from '../components/ChatBox'
import Aside from '../components/Aside'
import { useEffect, useRef, useState } from 'react'



export default function HomePage({ users }) {
    const [currentChatId, setCurrentChatId] = useState("theMegaChat")
    const scollToRef = useRef()


    return (
        <main className='Main'>
            <Aside setChatId={ setCurrentChatId } currentChatId={currentChatId} users={ users } scollToRef={scollToRef}/>
            <ChatBox chatId={ currentChatId } scollToRef={scollToRef} users={users} />
        </main>
    )
    
}