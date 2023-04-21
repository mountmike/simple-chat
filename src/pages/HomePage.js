import './HomePage.css'
import ChatBox from '../components/ChatBox'
import Aside from '../components/Aside'

export default function HomePage() {

    return (
        <main className='Main'>
            <Aside />
            <ChatBox />
        </main>
    )
    
}