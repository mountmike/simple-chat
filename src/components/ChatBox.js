import './ChatBox.css'
import Message from '../components/Message'
import SendMessage from '../components/SendMessage'
import { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit} from "firebase/firestore";
import { db } from "../firebase";

export default function ChatBox({ chatId }) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const q = query(
          collection(db, `/messages/${chatId}/message_list`),
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
    
      console.log("messages ", messages);

    return (
        <section className="ChatBox">
            <div className="messages-wrapper">
              
            {messages?.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
                <SendMessage chatId={chatId} />
        </section>
    )
}