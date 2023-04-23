import { useState } from "react";
import { auth } from "../firebase";
import { createNewChat } from "../utils/utils";

export function ChooseRecipient({ setIsNewChat, setNewChatTrackker }){
    const { uid  } = auth.currentUser;
    const [recipientId, setRecipientId] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        createNewChat(recipientId)
        setRecipientId("")
        setIsNewChat(false)
    }

    return (
        <div className="ChooseRecipient">
            <form onSubmit={handleSubmit}>
                <input onChange={e => setRecipientId(e.target.value)} placeholder="enter recipient's user id" type="text" name="" id="enterRecipient" />
                <button>create</button>
            </form>


            {/* <select name="" id="" onChange={handleChange} >
                <option value="">-- Choose Recipient</option>
                {users.users.filter(user => user.id !== uid ).map( user => <option key={user.id} value={user.id}>{user.userName}</option>)}        
            </select>     */}
        </div>
        )
}