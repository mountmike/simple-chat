import { useState } from 'react'
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import './SendMessage.css'

export default function SendMessage({ chatId }) {
  const [message, setMessage] = useState("")

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message.trim() === "") {
      //alert("enter valid message") ---- turned off but doesn't send 
      return
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, `/messages/${chatId}/message_list`), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");

    
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
          <button type="submit">Send</button>
        </form>
    )
}