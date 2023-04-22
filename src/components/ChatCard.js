import { useState } from "react"

export default function ChatCard({ conversation, setChatId }) {
    
    
      


    return (
        <article className="chat-wrapper" onClick={() => setChatId(conversation)}>
            <img className="chat-img" src="https://placehold.co/400x400" alt="" />
            <div className="message-preview-wrapper">
                <h5 className="display-name">{conversation}</h5>
                <span className="message-preview">message preview...</span>
            </div>
        </article>
    )
}