import { useEffect, useState } from 'react'
import { certifications } from '../data/certifications'
import { streakDays, cert } from '../data/sampleProgress'
import { getProfile, updateProfile } from '../lib/queries'
import styles from './Profile.module.css'

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function formatDate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

function daysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(`${dateStr}T00:00:00`)
  return Math.round((target - today) / 86400000)
}

function formatTime(timeStr) {
  return timeStr.slice(0, 5)
}

export default function Profile({ onBack }) {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)
  const [editingDate, setEditingDate] = useState(false)
  const [editingGoal, setEditingGoal] = useState(false)
  const [editingReminder, setEditingReminder] = useState(false)

  useEffect(() => {
    getProfile().then(setProfile).catch(setError)
  }, [])

  if (error) {
    return <main className={styles.profile}>No se pudo cargar tu perfil. Intenta de nuevo más tarde.</main>
  }
  if (!profile) {
    return <main className={styles.profile}>Cargando…</main>
  }

  function selectCert(code) {
    setProfile((p) => ({ ...p, targetCertCode: code }))
    updateProfile({ targetCertCode: code }).catch(setError)
  }

  function saveExamDate(value) {
    setProfile((p) => ({ ...p, examDate: value }))
    setEditingDate(false)
    updateProfile({ examDate: value }).catch(setError)
  }

  function saveGoal(value) {
    setProfile((p) => ({ ...p, weeklyGoalHours: value }))
    setEditingGoal(false)
    updateProfile({ weeklyGoalHours: value }).catch(setError)
  }

  function saveReminder(value) {
    setProfile((p) => ({ ...p, reminderTime: value }))
    setEditingReminder(false)
    updateProfile({ reminderTime: value }).catch(setError)
  }

  const date = new Date(`${profile.examDate}T00:00:00`)
  const daysLeft = daysUntil(profile.examDate)

  return (
    <main className={styles.profile}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={onBack} aria-label="Volver">
          ‹
        </button>
        <h1>Mi perfil</h1>
      </header>

      <section className={styles.studyRow}>
        <span className={styles.avatar}>M</span>
        <div>
          <h2>Mi estudio</h2>
          <p className={styles.studySubtitle}>
            Racha de {streakDays} días · {cert.questionsDone} temas vistos
          </p>
        </div>
      </section>

      <p className={styles.sectionLabel}>Certificación objetivo</p>
      <div className={styles.certList}>
        {certifications.map((c) => {
          const selected = c.code === profile.targetCertCode
          return (
            <button
              key={c.code}
              className={`${styles.certRow} ${selected ? styles.certRowSelected : ''}`}
              onClick={() => selectCert(c.code)}
            >
              <span className={`${styles.radio} ${selected ? styles.radioSelected : ''}`}>{selected ? '✓' : null}</span>
              <span className={styles.certInfo}>
                <span className={styles.certName}>{c.name}</span>
                <span className={styles.certMeta}>
                  {c.level} · {c.specialty}
                </span>
              </span>
              <span className={styles.certCode}>{c.code}</span>
            </button>
          )
        })}
      </div>

      <p className={styles.sectionLabel}>Fecha del examen</p>
      <div className={styles.examCard}>
        <span className={styles.calendar}>
          <span className={styles.calendarMonth}>{MONTHS[date.getMonth()]}</span>
          <span className={styles.calendarDay}>{date.getDate()}</span>
        </span>
        <div className={styles.examInfo}>
          {editingDate ? (
            <input
              type="date"
              className={styles.dateInput}
              defaultValue={profile.examDate}
              autoFocus
              onChange={(e) => e.target.value && saveExamDate(e.target.value)}
              onBlur={() => setEditingDate(false)}
            />
          ) : (
            <>
              <p className={styles.examDate}>{formatDate(profile.examDate)}</p>
              <p className={styles.examDays}>
                {daysLeft >= 0 ? `Faltan ${daysLeft} días` : `Pasó hace ${-daysLeft} días`}
              </p>
            </>
          )}
        </div>
        {!editingDate && (
          <button className={styles.editButton} onClick={() => setEditingDate(true)}>
            Editar
          </button>
        )}
      </div>
      <p className={styles.hint}>Ajustamos tu meta diaria para llegar a tiempo.</p>

      <p className={styles.sectionLabel}>Ritmo de estudio</p>
      <div className={styles.paceGrid}>
        <div className={styles.paceCard}>
          <span className={styles.paceLabel}>Meta semanal</span>
          {editingGoal ? (
            <input
              type="number"
              min="1"
              max="40"
              className={styles.paceInput}
              defaultValue={profile.weeklyGoalHours}
              autoFocus
              onBlur={(e) => saveGoal(Number(e.target.value))}
            />
          ) : (
            <button className={styles.paceValue} onClick={() => setEditingGoal(true)}>
              {profile.weeklyGoalHours} h
            </button>
          )}
        </div>
        <div className={styles.paceCard}>
          <span className={styles.paceLabel}>Recordatorio</span>
          {editingReminder ? (
            <input
              type="time"
              className={styles.paceInput}
              defaultValue={formatTime(profile.reminderTime)}
              autoFocus
              onChange={(e) => e.target.value && saveReminder(e.target.value)}
              onBlur={() => setEditingReminder(false)}
            />
          ) : (
            <button className={styles.paceValue} onClick={() => setEditingReminder(true)}>
              {formatTime(profile.reminderTime)}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
