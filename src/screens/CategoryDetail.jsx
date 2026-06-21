import { useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import { getCategories } from '../lib/queries'
import styles from './CategoryDetail.module.css'

function statusKey(status) {
  return status === 'in-progress' ? 'inProgress' : status
}

function statusLabel(status) {
  if (status === 'completed') return 'Completado'
  if (status === 'in-progress') return 'En curso'
  return 'Pendiente'
}

export default function CategoryDetail({ categoryId, onBack }) {
  const [categories, setCategories] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCategories().then(setCategories).catch(setError)
  }, [])

  if (error) {
    return <main className={styles.detail}>No se pudo cargar la sección. Intenta de nuevo más tarde.</main>
  }
  if (!categories) {
    return <main className={styles.detail}>Cargando…</main>
  }

  const index = categories.findIndex((c) => c.id === categoryId)
  const category = categories[index]

  if (!category) {
    return (
      <main className={styles.detail}>
        <header className={styles.header}>
          <button className={styles.backButton} onClick={onBack} aria-label="Volver">
            ‹
          </button>
          <span>Temario</span>
        </header>
        <p>No se encontró esta sección.</p>
      </main>
    )
  }

  const totalMinutes = category.lessons.reduce((sum, l) => sum + l.minutes, 0)
  const nextIndex = category.lessons.findIndex((l) => l.status !== 'completed')
  const continueIndex = nextIndex === -1 ? category.lessons.length - 1 : nextIndex

  return (
    <main className={styles.detail}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={onBack} aria-label="Volver">
          ‹
        </button>
        <span>Temario</span>
      </header>

      <span className={styles.sectionBadge}>Sección {String(index + 1).padStart(2, '0')}</span>
      <h1>{category.label}</h1>
      <p className={styles.summary}>
        {category.lessons.length} lecciones · {totalMinutes} min · {category.percent}% completado
      </p>
      <ProgressBar percent={category.percent} />

      <div className={styles.lessons}>
        {category.lessons.map((lesson, i) => (
          <div key={lesson.title} className={`${styles.lesson} ${lesson.status === 'in-progress' ? styles.active : ''}`}>
            <span className={`${styles.lessonNumber} ${styles[statusKey(lesson.status)] || ''}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className={styles.lessonInfo}>
              <p className={`${styles.lessonTitle} ${styles[statusKey(lesson.status)] || ''}`}>{lesson.title}</p>
              <p className={styles.lessonMeta}>
                {lesson.minutes} min · {statusLabel(lesson.status)}
              </p>
            </div>
            <span className={`${styles.lessonStatus} ${styles[statusKey(lesson.status)] || ''}`}>
              {lesson.status === 'completed' ? '✓' : null}
            </span>
          </div>
        ))}
      </div>

      <button className={styles.primaryButton}>Continuar lección {continueIndex + 1}</button>
    </main>
  )
}
