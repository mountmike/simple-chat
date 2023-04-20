import Message from '../components/Message'
import SendMessage from '../components/SendMessage'

export default function ChatBox() {
    return (
        <section className="ChatBox">
            <div className="messages-wrapper">
                <Message />
            </div>
                <SendMessage />
        </section>
    )
}