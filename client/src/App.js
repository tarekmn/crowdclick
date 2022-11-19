import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import Navigation from './components/Navigation.jsx';
import Login from './components/Login';
import Home from './components/Home';
import Friends from './components/Friends.jsx';
import Profile from './components/Profile';
import './App.css'

function App() {




  return (
    <div >
      <header>
        <Navigation
        />
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </BrowserRouter>
      </header>

    </div>
  );
}

export default App;