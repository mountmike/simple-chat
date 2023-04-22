import { auth } from "../firebase";
import { creatNewChat } from "../utils/utils";

export function ChooseRecipient( users ){
    const { uid  } = auth.currentUser;

    const handleChange = e => {
        console.log(e.target.value)
        creatNewChat(e.target.value)
        
    }

    return (
        <div>
            <select name="" id="" onChange={handleChange} >
                <option value="">-- Choose Recipient</option>
                {users.users.filter(user => user.id !== uid ).map( user => <option key={user.id} value={user.id}>{user.userName}</option>)}        
            </select>    
        </div>
        )
}