import { useState } from "react"

export default function ChatCard() {

    return (
        <article className="chat-wrapper">
            <img className="chat-img" src="https://placehold.co/400x400" alt="" />
            <div className="message-preview-wrapper">
                <h5 className="display-name">Liam Kendall</h5>
                <span className="message-preview">message preview...</span>
            </div>
        </article>
    )
}