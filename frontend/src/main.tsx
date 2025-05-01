import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FriendProvider } from './components/FriendContext.tsx'
import { ProfileProvider } from './components/ProfileContext.tsx'

createRoot(document.getElementById('root')!).render(
  <FriendProvider>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  </FriendProvider>
)
