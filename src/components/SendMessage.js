import { useState } from 'react'
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import './SendMessage.css'

export default function SendMessage({ chatId }) {
  const [message, setMessage] = useState("")

  const sendMessage = async (e) => {
    e.preventDefault()
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, `/messages/${chatId}/message_list`), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");

    const messageRef = doc(db, "messages", chatId);
    await updateDoc(messageRef, {
      last_message: message
    });
  

    
  }

  return (
      <form onSubmit={(e) => sendMessage(e)} className="SendMessage">
        <label htmlFor="messageInput" hidden>
        Enter Message
        </label>
        <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
        <button disabled={message ? false : true } type="submit">Send</button>
      </form>
  )
}