import { useState } from "react";
import { auth } from "../firebase";
import { creatNewChat } from '../utils/utils'
import { ChooseRecipient } from "./ChooseRecipient";
import { TestDelete } from "../TestDbCalls";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePen } from '@fortawesome/free-solid-svg-icons'

export default function ProfileHeader({ setChatId , users, setIsNewChat }) {
    const { email, uid, displayName, photoURL } = auth.currentUser;
    const [chooseRecipient , setChooseRecipient ] = useState(false)
    
     
    const handleNewChat = (e) => {
        setIsNewChat(prev => !prev)
        // const simonUserId = "XHukCG7e6XPSVmmhvq2T4h47giy1"
        // setChooseRecipient(true)
        //creatNewChat(simonUserId)
    }
    const userInfo = (users?.filter(user => email === user.email)[0])
    
    return (
        <header>
                <section className="currentUser">
                    <img className="display-img" src={userInfo?.avatar} alt="" />
                    <h4 className="display-name">{displayName}</h4>
                </section>
            
                <FontAwesomeIcon id="newChatBtn" icon={faSquarePen} size="2x" onClick={handleNewChat} />
        
                
                {/* {chooseRecipient?<ChooseRecipient users={users}/>:<button onClick={handleNewChat}>new chat</button>} */}
        </header>
    )
}