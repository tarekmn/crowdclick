import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import { AppProvider } from "./utils/AppContext"
import Navigation from './pages/Navigation.jsx';
import Login from './pages/Login';
import Home from './pages/Home';
import Friends from './pages/Friends.jsx';
import Profile from './pages/Profile';
import Signup from './pages/Signup.jsx';
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
      <AppProvider userData={userData} setUserData={setUserData} value={{}}>
        <Navigation />
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Home userData={userData} setUserData={setUserData} />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile userData={userData} setUserData={setUserData} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </BrowserRouter>
      </AppProvider>

    </div>
  );
}

export default App;