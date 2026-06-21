import { useState } from 'react'
import { questions } from '../data/sampleQuestions'
import styles from './Quiz.module.css'

export default function Quiz({ onBack }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)

  const total = questions.length
  const finished = index >= total

  function selectOption(i) {
    if (selected !== null) return
    setSelected(i)
  }

  function next() {
    setSelected(null)
    setIndex((i) => i + 1)
  }

  function restart() {
    setSelected(null)
    setIndex(0)
  }

  if (finished) {
    return (
      <main className={`${styles.quiz} ${styles.quizDone}`}>
        <h2>¡Completaste el cuestionario!</h2>
        <p>Repasaste {total} preguntas.</p>
        <button className={styles.primaryButton} onClick={restart}>
          Repetir
        </button>
        <button className={styles.textButton} onClick={onBack}>
          Volver al inicio
        </button>
      </main>
    )
  }

  const current = questions[index]
  const isCorrect = selected === current.correct

  return (
    <main className={styles.quiz}>
      <header className={styles.quizHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={onBack} aria-label="Volver">
            ←
          </button>
          <h1>Cuestionario</h1>
        </div>
        <span className={styles.quizCount}>
          Pregunta {index + 1} de {total}
        </span>
      </header>

      <div className={styles.segments}>
        {questions.map((_, i) => (
          <span key={i} className={`${styles.segment} ${i <= index ? styles.filled : ''}`} />
        ))}
      </div>

      <p className={styles.questionText}>{current.question}</p>

      <div className={styles.options}>
        {current.options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i)
          const isSelected = selected === i
          const isAnswerCorrect = i === current.correct
          let stateClass = ''
          if (selected !== null) {
            if (isAnswerCorrect) stateClass = styles.correct
            else if (isSelected) stateClass = styles.incorrect
          }
          return (
            <button
              key={letter}
              className={`${styles.option} ${stateClass}`}
              onClick={() => selectOption(i)}
              disabled={selected !== null}
            >
              <span className={styles.optionBadge}>
                {selected !== null && isAnswerCorrect ? '✓' : selected !== null && isSelected ? '✕' : letter}
              </span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className={`${styles.feedback} ${isCorrect ? styles.correct : styles.incorrect}`}>
          <p className={styles.feedbackTitle}>
            <span className={styles.dot} /> {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </p>
          <p className={styles.feedbackText}>{current.explanation}</p>
        </div>
      )}

      <button className={styles.primaryButton} disabled={selected === null} onClick={next}>
        Siguiente pregunta
      </button>
    </main>
  )
}
