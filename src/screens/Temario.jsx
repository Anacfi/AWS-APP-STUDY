import { useEffect, useState } from 'react'
import { getCategories } from '../lib/queries'
import styles from './Temario.module.css'

function statusKey(status) {
  return status === 'in-progress' ? 'inProgress' : status
}

export default function Temario({ onBack, onSelectCategory }) {
  const [categories, setCategories] = useState(null)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data)
        setExpandedId(data[0]?.id ?? null)
      })
      .catch(setError)
  }, [])

  if (error) {
    return <main className={styles.temario}>No se pudo cargar el temario. Intenta de nuevo más tarde.</main>
  }
  if (!categories) {
    return <main className={styles.temario}>Cargando…</main>
  }

  const totalTopics = categories.reduce((sum, c) => sum + c.topicsTotal, 0)

  return (
    <main className={styles.temario}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={onBack} aria-label="Volver">
          ←
        </button>
      </header>

      <p className={styles.eyebrow}>Plan de estudio · SAA-C03</p>
      <h1>Temario</h1>
      <p className={styles.summary}>
        {categories.length} secciones · {totalTopics} temas
      </p>

      <div className={styles.list}>
        {categories.map((c) => {
          const isOpen = expandedId === c.id
          return (
            <div className={styles.section} key={c.id}>
              <button className={styles.sectionHeader} onClick={() => setExpandedId(isOpen ? null : c.id)}>
                <span className={styles.badge}>{c.short}</span>
                <span className={styles.sectionInfo}>
                  <span className={styles.sectionLabel}>{c.label}</span>
                  <span className={styles.sectionMeta}>
                    {c.topicsCompleted} de {c.topicsTotal} temas
                  </span>
                </span>
                <span className={styles.sectionPercent}>{c.percent}%</span>
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>›</span>
              </button>

              {isOpen && (
                <div className={styles.lessons}>
                  {c.lessons.map((lesson) => (
                    <div className={styles.lesson} key={lesson.title}>
                      <span className={`${styles.lessonStatus} ${styles[statusKey(lesson.status)] || ''}`}>
                        {lesson.status === 'completed' ? '✓' : null}
                      </span>
                      <span className={styles.lessonTitle}>{lesson.title}</span>
                      <span className={styles.lessonMinutes}>{lesson.minutes} min</span>
                    </div>
                  ))}
                  <button className={styles.seeDetail} onClick={() => onSelectCategory(c.id)}>
                    Ver sección completa
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}
