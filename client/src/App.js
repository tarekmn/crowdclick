import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import Navigation from './components/Navigation.jsx';
import Login from './components/Login';
import Home from './components/Home';
import Friends from './components/Friends.jsx';
import Profile from './components/Profile';
import Signup from './components/Signup.jsx';
import './App.css'

function App() {

  const [userData, setUserData] = useState()



  const getUsers = async () => {
    const query = await fetch('/api/users', {
      method: 'GET'
    })
    const response = await query.json()
    setUserData(response)
  }


  useEffect(() => {
    getUsers()
    // console.log(userData)
  }, [])



  return (
    <div >
      <header>
        <Navigation />
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Home userData={userData} setUserData={setUserData} />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </BrowserRouter>
      </header>

    </div>
  );
}

export default App;