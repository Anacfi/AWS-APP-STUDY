import { useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import { cert, continueItem, streakDays } from '../data/sampleProgress'
import { certifications } from '../data/certifications'
import { getCategories, getFlashcards, getProfile } from '../lib/queries'
import styles from './Home.module.css'

const flashcardsReviewedToday = 0

function daysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(`${dateStr}T00:00:00`)
  return Math.round((target - today) / 86400000)
}

function CircularProgress({ percent, size = 116, stroke = 9 }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percent / 100)
  const center = size / 2

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles.ring}>
      <circle cx={center} cy={center} r={radius} stroke="var(--line)" strokeWidth={stroke} fill="none" />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="var(--amber)"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text x="50%" y="47%" textAnchor="middle" className={styles.ringPercent}>
        {percent}%
      </text>
      <text x="50%" y="64%" textAnchor="middle" className={styles.ringLabel}>
        listo
      </text>
    </svg>
  )
}

export default function Home({ onNavigate }) {
  const [categories, setCategories] = useState(null)
  const [flashcardsCount, setFlashcardsCount] = useState(null)
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCategories().then(setCategories).catch(setError)
    getFlashcards()
      .then((data) => setFlashcardsCount(data.length))
      .catch(setError)
    getProfile().then(setProfile).catch(setError)
  }, [])

  if (error) {
    return <main className={styles.home}>No se pudo cargar la información. Intenta de nuevo más tarde.</main>
  }
  if (!categories || flashcardsCount === null || !profile) {
    return <main className={styles.home}>Cargando…</main>
  }

  const targetCert = certifications.find((c) => c.code === profile.targetCertCode) ?? certifications[0]
  const daysLeft = daysUntil(profile.examDate)

  return (
    <main className={styles.home}>
      <header className={styles.homeHeader}>
        <div>
          <p className={styles.eyebrow}>Vas por buen camino</p>
          <h1>Tu progreso</h1>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.streakPill}>🔥 {streakDays} días</span>
          <button className={styles.avatarButton} onClick={() => onNavigate('profile')} aria-label="Mi perfil">
            M
          </button>
        </div>
      </header>

      <section className={styles.certCard}>
        <CircularProgress percent={cert.percent} />
        <div className={styles.certInfo}>
          <h2>{targetCert.name}</h2>
          <p className={styles.certMeta}>
            {targetCert.level} · {targetCert.code}
          </p>
          <div className={styles.certStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{cert.questionsDone}</span>
              <span className={styles.statLabel}>de {cert.questionsTotal}</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statNum} ${styles.statNumAccent}`}>{daysLeft}d</span>
              <span className={styles.statLabel}>al examen</span>
            </div>
          </div>
        </div>
      </section>

      <button className={styles.continueCard} onClick={() => onNavigate('quiz')}>
        <div className={styles.continueTop}>
          <span>Continuar · {continueItem.category}</span>
          <span className={styles.continuePercent}>{continueItem.percent}%</span>
        </div>
        <h3>{continueItem.topic}</h3>
        <ProgressBar percent={continueItem.percent} />
      </button>

      <button className={`${styles.continueCard} ${styles.flashcardsCard}`} onClick={() => onNavigate('flashcards')}>
        <div className={styles.continueTop}>
          <span>Repaso rápido</span>
          <span>{flashcardsCount} tarjetas</span>
        </div>
        <h3>Tarjetas</h3>
        <div className={`${styles.continueTop} ${styles.continueSubrow}`}>
          <span>
            {flashcardsReviewedToday} de {flashcardsCount} repasadas hoy
          </span>
        </div>
        <ProgressBar percent={(flashcardsReviewedToday / flashcardsCount) * 100} />
      </button>

      <section>
        <div className={styles.categoriesHeader}>
          <h3>Categorías</h3>
          <button className={styles.seeAll} onClick={() => onNavigate('temario')}>
            Ver todo
          </button>
        </div>
        <div className={styles.categoriesGrid}>
          {categories.slice(0, 4).map((c) => (
            <button className={styles.categoryCard} key={c.id} onClick={() => onNavigate('category', c.id)}>
              <div className={styles.categoryTop}>
                <span className={styles.categoryBadge}>{c.short}</span>
                <span className={styles.categoryPercent}>{c.percent}%</span>
              </div>
              <p className={styles.categoryLabel}>{c.label}</p>
              <ProgressBar percent={c.percent} />
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
