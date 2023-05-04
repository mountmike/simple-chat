import { collection, doc, setDoc, addDoc, updateDoc, arrayUnion, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import uuid from 'react-uuid';

export async function createNewChat(recipientId) {
    const newChatId = uuid()
    const { uid, displayName } = auth.currentUser
    let recipientName, senderName;
    const recipientRef = doc(db, "users", recipientId);
    const senderRef = doc(db, "users", uid);

    await getDoc(recipientRef).then(docSnap => {
        if (docSnap.exists()) {
          recipientName = docSnap.data().userName
        }
    })

    await getDoc(senderRef).then(docSnap => {
      if (docSnap.exists()) {
        senderName = docSnap.data().userName
      }
  })

    const docRef = await setDoc(doc(db, "messages", newChatId), {
        chat_name: "",
        group_chat: false,
        last_message: "",
        last_message_date: serverTimestamp(),
        members: [senderName, recipientName],
        membersId: [uid, recipientId],
        id: newChatId
      });  

    const userConversations = await doc(db, `users`, uid)
    const recipientConversations = await doc(db, `users`, recipientId)
    await updateDoc(userConversations, {
        conversations: arrayUnion(newChatId)
    })
    await updateDoc(recipientConversations, {
        conversations: arrayUnion(newChatId)
    })
  }
