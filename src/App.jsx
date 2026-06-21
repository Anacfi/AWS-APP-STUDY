import { useState } from 'react'
import Home from './screens/Home'
import Quiz from './screens/Quiz'
import Flashcards from './screens/Flashcards'
import Temario from './screens/Temario'
import CategoryDetail from './screens/CategoryDetail'
import Profile from './screens/Profile'

function App() {
  const [screen, setScreen] = useState('home')
  const [activeCategory, setActiveCategory] = useState(null)

  const goHome = () => setScreen('home')
  const goTemario = () => setScreen('temario')

  function navigate(target, payload) {
    if (target === 'category') setActiveCategory(payload)
    setScreen(target)
  }

  if (screen === 'quiz') return <Quiz onBack={goHome} />
  if (screen === 'flashcards') return <Flashcards onBack={goHome} />
  if (screen === 'temario') {
    return <Temario onBack={goHome} onSelectCategory={(id) => navigate('category', id)} />
  }
  if (screen === 'category') return <CategoryDetail categoryId={activeCategory} onBack={goTemario} />
  if (screen === 'profile') return <Profile onBack={goHome} />
  return <Home onNavigate={navigate} />
}

export default App
