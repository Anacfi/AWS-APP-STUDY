import { useState } from 'react'
import Home from './screens/Home'
import Quiz from './screens/Quiz'
import Flashcards from './screens/Flashcards'
import Profile from './screens/Profile'

function App() {
  const [screen, setScreen] = useState('home')
  const goHome = () => setScreen('home')

  if (screen === 'quiz') return <Quiz onBack={goHome} />
  if (screen === 'flashcards') return <Flashcards onBack={goHome} />
  if (screen === 'profile') return <Profile onBack={goHome} />
  return <Home onNavigate={setScreen} />
}

export default App
