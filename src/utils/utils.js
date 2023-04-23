import { collection, doc, addDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function createNewChat(recipientId) {
    const { uid, displayName } = auth.currentUser
    let recipientName, senderName;
    const recipientRef = doc(db, "users2", recipientId);
    const senderRef = doc(db, "users2", uid);

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

    const docRef = await addDoc(collection(db, "messages"), {
        chat_name: "",
        group_chat: false,
        last_message: "this is a fake value created in utils.js",
        last_message_date: "serverTimestamp()",
        members: [senderName, recipientName]
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
