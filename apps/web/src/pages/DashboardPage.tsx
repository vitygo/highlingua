import { useAuthStore } from '@/store/authStore'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.greeting}>
            Hey, {user?.name}!
          </h1>
          <p className={styles.sub}>Ready to learn today?</p>
          <button className={styles.studyBtn}>
            <i className="ti ti-brain" aria-hidden="true" />
            Start studying
          </button>
        </div>
        <img
          src="/characters/lingo.png"
          alt="Lingo"
          className={styles.mascot}
        />
      </div>

      <div className={styles.statsRow}>
        <div className={`${styles.statCard} ${styles.green}`}>
          <div className={styles.statVal}>0</div>
          <div className={styles.statLabel}>Words learned</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>0%</div>
          <div className={styles.statLabel}>Accuracy</div>
        </div>
        <div className={`${styles.statCard} ${styles.yellow}`}>
          <div className={styles.statVal}>0</div>
          <div className={styles.statLabel}>Due today</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>0</div>
          <div className={styles.statLabel}>Collections</div>
        </div>
      </div>

      <div className={styles.emptyState}>
        <img
          src="/characters/Memo.png"
          alt="Memo"
          className={styles.emptyChar}
        />
        <h2 className={styles.emptyTitle}>No cards yet!</h2>
        <p className={styles.emptySub}>Generate your first flashcards to get started</p>
        <button className={styles.generateBtn}>
          <i className="ti ti-sparkles" aria-hidden="true" />
          Generate cards
        </button>
      </div>
    </div>
  )
}

export default DashboardPage