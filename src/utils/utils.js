import { collection, doc, addDoc, updateDoc, arrayUnion} from "firebase/firestore";
import { auth, db } from "../firebase";

export async function creatNewChat(recipientId) {
    const { uid } = auth.currentUser
    const docRef = await addDoc(collection(db, "messages"), {
        chat_name: "",
        group_chat: false,
        last_message: "this is a fake value created in utils.js",
        last_message_date: "serverTimestamp()",
        members: [uid, recipientId]
      });  

    const userConversations = await doc(db, `users2`, uid)
    const recipientConversations = await doc(db, `users2`, recipientId)
    await updateDoc(userConversations, {
        conversations: arrayUnion(docRef.id)
    })
    await updateDoc(recipientConversations, {
        conversations: arrayUnion(docRef.id)
    })
  }
