import "./Aside.css"
import { auth } from "../firebase";
import ChatCard from './ChatCard'
import { useState } from "react";

export default function Aside() {
    const { uid, displayName, photoURL } = auth.currentUser;
    return (
        <aside className="Aside">
            <header>
                <section className="currentUser">
                    <img className="display-img" src={photoURL} alt="" />
                    <h4 className="display-name">{displayName}</h4>
                </section>
                <button>new chat</button>
            </header>
            <section className="search-bar">
                <input placeholder="Search" type="text" name="" id="" />
            </section>
            <section className="chat-list">
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
            </section>
        </aside>
    )
}