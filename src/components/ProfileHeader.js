import { auth } from "../firebase";
import { creatNewChat } from '../utils/utils'

export default function ProfileHeader({ setChatId }) {
    const { uid, displayName, photoURL } = auth.currentUser;

    const handleNewChat = (e) => {
        const simonUserId = "XHukCG7e6XPSVmmhvq2T4h47giy1"
        creatNewChat(simonUserId)
    }

    return (
        <header>
                <section className="currentUser">
                    <img className="display-img" src={photoURL} alt="" />
                    <h4 className="display-name">{displayName}</h4>
                </section>
                <button onClick={handleNewChat}>new chat</button>
            </header>
    )
}