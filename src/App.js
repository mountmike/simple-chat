import './App.css';
import { auth } from "./firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Banner from './components/Banner'
import { useEffect, useState } from 'react';
import { GetUsers ,RegisterUser } from './user';
import { query, collection, orderBy, onSnapshot, limit} from "firebase/firestore";
import { db } from './firebase';

let currentUser

function App() {
  
  const [ users , setUsers ] = useState()
  //login user
  const [user] = useAuthState(auth);
  // data base user  

  
  useEffect(()=> {
    GetUsers(setUsers)
    },[user])
    
  if(users){
    if(!users.map(user => (user.id)).includes(user.uid)){
      RegisterUser()
      }
    
    }
  

  
          



  
  
  return (
    <div className="App">
      <Banner />
      {!user ? <LoginPage /> : <HomePage />}
    </div>
  );
}

export default App;
