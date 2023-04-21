import './ChatBox.css'
import Message from '../components/Message'
import SendMessage from '../components/SendMessage'
import { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit} from "firebase/firestore";
import { db } from "../firebase";

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const q = query(
          collection(db, "messages"),
          orderBy("createdAt"),
          limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let messages = [];
          QuerySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(messages);
        });
        return () => unsubscribe;
      }, []);
    
    return (
        <section className="ChatBox">
            <div className="messages-wrapper">
            {messages?.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
                <SendMessage />
        </section>
    )
}