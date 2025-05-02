import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './components/Signup'
import { Dashbord } from './components/Dashbord'
import { UserProfile } from './components/UserProfile'
import { io } from "socket.io-client";
import { socketW } from './hooks/socket'
import { Login } from './components/Login'

function App() {
  const socket = io("http://localhost:8080");
  socketW(socket);
  return (<div>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashbord' element={<Dashbord/>}/>
      <Route path='/user' element={<UserProfile/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  </div>)
}

export default App
