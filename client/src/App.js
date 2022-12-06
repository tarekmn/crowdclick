import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";
import Navigation from "./pages/Navigation.jsx";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Friends from "./pages/Friends.jsx";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <AppProvider>
        <Navigation />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Home />} />

          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
