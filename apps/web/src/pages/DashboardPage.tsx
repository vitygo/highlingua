import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useStudyStats } from '@/features/study'
import { useCollections } from '@/features/cards'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()
  const { data: stats } = useStudyStats()
  const { data: collectionsData } = useCollections()

  const collections = collectionsData?.collections ?? []

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.greeting}>Hey, {user?.name}!</h1>
          <p className={styles.sub}>Ready to learn today?</p>
          <button
            className={styles.studyBtn}
            onClick={() => navigate('/study')}
          >
            <i className="ti ti-brain" aria-hidden="true" />
            Start studying
          </button>
        </div>
        {/* <img
          src="/characters/im5.png"
          alt="Lingo"
          className={styles.mascot}
        /> */}
      </div>

      <div className={styles.statsRow}>
        <div className={`${styles.statCard} ${styles.green}`}>
          <div className={styles.statVal}>{stats?.learnedCards ?? 0}</div>
          <div className={styles.statLabel}>Words learned</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{stats?.accuracy ?? 0}%</div>
          <div className={styles.statLabel}>Accuracy</div>
        </div>
        <div className={`${styles.statCard} ${styles.yellow}`}>
          <div className={styles.statVal}>{stats?.dueCards ?? 0}</div>
          <div className={styles.statLabel}>Due today</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{stats?.collections ?? 0}</div>
          <div className={styles.statLabel}>Collections</div>
        </div>
      </div>

      {collections.length === 0 ? (
        <div className={styles.emptyState}>
          <img
            src="/characters/memo.png"
            alt="Memo"
            className={styles.emptyChar}
          />
          <h2 className={styles.emptyTitle}>No cards yet!</h2>
          <p className={styles.emptySub}>Generate your first flashcards to get started</p>
          <button
            className={styles.generateBtn}
            onClick={() => navigate('/generate')}
          >
            <i className="ti ti-sparkles" aria-hidden="true" />
            Generate cards
          </button>
        </div>
      ) : (
        <div>
          <h2 className={styles.sectionTitle}>My collections</h2>
          <div className={styles.collectionsGrid}>
  {collections.slice(0, 4).map((col, index) => {
    const colors = ['#c8f55a', '#ffe44d', '#ffb3d9', '#fff']
    const bg = colors[index % colors.length]
    return (
      <div
        key={col.id}
        className={styles.colCard}
        style={{ background: bg }}
        onClick={() => navigate('/collections')}
      >
        <div className={styles.colTop}>
          <div className={styles.iconContainer}>
          <img className={styles.colEmoji} src={`/icons/${col.emoji}.png`}></img>
          </div>
          <span className={styles.colBadge}>
            {col._count.cards} {col._count.cards === 1 ? 'card' : 'cards'}
          </span>
        </div>
        <div className={styles.colName}>{col.name}</div>
        <div className={styles.colAction}>
          View cards <i className="ti ti-arrow-right" aria-hidden="true" />
        </div>
      </div>
    )
  })}
</div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage