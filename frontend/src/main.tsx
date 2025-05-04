import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FriendProvider } from './context/FriendContext.tsx'
import { ProfileProvider } from './context/ProfileContext.tsx'
import { User2Provider } from './context/user2Context.tsx'
import {  SocketProvider } from './context/socketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <FriendProvider>
    <ProfileProvider>
      <User2Provider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </User2Provider>
    </ProfileProvider>
  </FriendProvider>
)
