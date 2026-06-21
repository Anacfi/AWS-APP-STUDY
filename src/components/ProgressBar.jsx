import styles from './ProgressBar.module.css'

export default function ProgressBar({ percent, thin = false }) {
  return (
    <div className={`${styles.barTrack} ${thin ? styles.thin : ''}`.trim()}>
      <div className={styles.barFill} style={{ width: `${percent}%` }} />
    </div>
  )
}
