import { query, collection, doc , onSnapshot, setDoc} from "firebase/firestore";
import { auth, db } from "./firebase";


export function GetUsers( setUsers ) {
    const q = query(
      collection(db, `/users2`),
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let users = [];
    QuerySnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    })
    setUsers(users);
    });
    return () => unsubscribe;
  }



  
export async function RegisterUser(){
  console.log('Added user to db');
  const { uid, displayName, photoURL } = auth.currentUser;
      await setDoc(doc(db, `users2`, uid ), {
      name: displayName,
      avatar: photoURL,
      messages: [],
      userName: displayName.split(' ')[0]
    });
}

export function updateUser(){


}