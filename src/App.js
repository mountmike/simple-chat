import './App.css';
import { useEffect } from 'react';
import { auth } from "./firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Banner from './components/Banner'


function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
  },[user])

  return (
    <div className="App">
      <Banner />
      {!user ? <LoginPage /> : <HomePage />}
    </div>
  );
}

export default App;
