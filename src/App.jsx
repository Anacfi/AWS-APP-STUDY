import { useState } from 'react'
import Home from './screens/Home'
import Quiz from './screens/Quiz'
import Flashcards from './screens/Flashcards'

function App() {
  const [screen, setScreen] = useState('home')
  const goHome = () => setScreen('home')

  if (screen === 'quiz') return <Quiz onBack={goHome} />
  if (screen === 'flashcards') return <Flashcards onBack={goHome} />
  return <Home onNavigate={setScreen} />
}

export default App
