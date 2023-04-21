import "./Message.css"
import { auth } from "../firebase";

export default function Message({message}) {
    const { uid, displayName, photoURL } = auth.currentUser;
    return (
        <div className={message.uid === uid ? "Message message-owner" : "Message"}>
            <section className="left">
                <span className="message-name">{message.name}</span>
                <span>{message.text}</span>
            </section>
            <section className="right">
               <span className="time-sent"></span>
            </section>
        </div>
    )
}