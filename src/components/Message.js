import { useEffect } from "react";
import "./Message.css"
import { auth } from "../firebase";
import { Timestamp } from "firebase/firestore";

export default function Message({message}) {
    const { uid, displayName, photoURL } = auth.currentUser;
   // console.log(message);
    // console.log(Date(message.createdAt.seconds*1000))
    
    var timeStamp = new Timestamp()

    return (
        <div className={message.uid === uid ? "Message message-owner" : "Message"}>
            <section className="left">
                <span className="message-name">{message.name}</span>
                <span>{message.text}</span>
            </section>
            <section className="right">
               <time className="time-sent">{Date(message.createdAt.seconds * 1000)}</time>
            </section>
        </div>
    )
}