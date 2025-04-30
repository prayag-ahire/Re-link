import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './components/Signup'
import { Dashbord } from './components/Dashbord'
import { UserProfile } from './components/UserProfile'


function App() {
  return (<div>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashbord' element={<Dashbord/>}/>
      <Route path='/user' element={<UserProfile/>}/>
    </Routes>
    </BrowserRouter>
  </div>)
}

export default App
