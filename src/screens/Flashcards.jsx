import { useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import { flashcards } from '../data/sampleFlashcards'
import styles from './Flashcards.module.css'

export default function Flashcards({ onBack }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const total = flashcards.length
  const finished = index >= total

  function advance() {
    setFlipped(false)
    setIndex((i) => i + 1)
  }

  function restart() {
    setFlipped(false)
    setIndex(0)
  }

  if (finished) {
    return (
      <main className={`${styles.flashcards} ${styles.flashcardsDone}`}>
        <h2>¡Repasaste todas las tarjetas!</h2>
        <p>{total} tarjetas en esta tanda.</p>
        <button className={styles.primaryButton} onClick={restart}>
          Repetir
        </button>
        <button className={styles.textButton} onClick={onBack}>
          Volver al inicio
        </button>
      </main>
    )
  }

  const card = flashcards[index]

  return (
    <main className={styles.flashcards}>
      <header className={styles.flashcardsHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={onBack} aria-label="Volver">
            ←
          </button>
          <h1>Tarjetas</h1>
        </div>
        <span className={styles.flashcardsCount}>
          {String(index + 1).padStart(2, '0')} / {total}
        </span>
      </header>

      <ProgressBar percent={(index / total) * 100} thin />

      <button className={styles.card} onClick={() => setFlipped((f) => !f)}>
        <div className={styles.cardTop}>
          <span className={styles.cardBadge}>{card.category}</span>
          <span className={styles.cardSide}>{flipped ? 'REVERSO' : 'ANVERSO'}</span>
        </div>
        <p className={styles.cardText}>{flipped ? card.back : card.front}</p>
        <div className={styles.cardHint}>
          <span className={styles.hintIcon}>↻</span>
          {flipped ? 'Toca para ver la pregunta' : 'Toca para ver la respuesta'}
        </div>
      </button>

      <div className={styles.cardActions}>
        <button className={styles.secondaryButton} onClick={advance}>
          Repasar
        </button>
        <button className={styles.primaryButton} onClick={advance}>
          La sé
        </button>
      </div>
    </main>
  )
}
