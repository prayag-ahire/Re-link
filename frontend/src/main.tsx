import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FriendProvider } from './components/FriendContext.tsx'
import { ProfileProvider } from './components/ProfileContext.tsx'
import { User2Provider } from './components/user2Context.tsx'

createRoot(document.getElementById('root')!).render(
  <FriendProvider>
    <ProfileProvider>
      <User2Provider>
      <App />
      </User2Provider>
    </ProfileProvider>
  </FriendProvider>
)
