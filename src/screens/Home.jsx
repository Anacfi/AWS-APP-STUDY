import ProgressBar from '../components/ProgressBar'
import { cert, continueItem, categories } from '../data/sampleProgress'
import { flashcards } from '../data/sampleFlashcards'
import styles from './Home.module.css'

const flashcardsReviewedToday = 0

function CircularProgress({ percent, size = 96, stroke = 9 }) {
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
  return (
    <main className={styles.home}>
      <header className={styles.homeHeader}>
        <div>
          <p className={styles.eyebrow}>Vas por buen camino</p>
          <h1>Tu progreso</h1>
        </div>
        <span className={styles.streakPill}>🔥 9 días</span>
      </header>

      <section className={styles.certCard}>
        <CircularProgress percent={cert.percent} />
        <div className={styles.certInfo}>
          <h2>{cert.name}</h2>
          <p className={styles.certMeta}>
            {cert.level} · {cert.code}
          </p>
          <div className={styles.certStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{cert.questionsDone}</span>
              <span className={styles.statLabel}>de {cert.questionsTotal}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{cert.daysLeft}d</span>
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
          <span>{flashcards.length} tarjetas</span>
        </div>
        <h3>Tarjetas</h3>
        <div className={styles.continueTop}>
          <span>
            {flashcardsReviewedToday} de {flashcards.length} repasadas hoy
          </span>
        </div>
        <ProgressBar percent={(flashcardsReviewedToday / flashcards.length) * 100} />
      </button>

      <section className={styles.categories}>
        <div className={styles.categoriesHeader}>
          <h3>Categorías</h3>
          <span className={styles.seeAll}>Ver todo</span>
        </div>
        <div className={styles.categoriesGrid}>
          {categories.map((c) => (
            <button className={styles.categoryCard} key={c.id} onClick={() => onNavigate('quiz')}>
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
