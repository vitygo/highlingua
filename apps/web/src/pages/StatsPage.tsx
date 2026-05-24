import { useStudyStats } from '@/features/study'
import { useCollections } from '@/features/cards'
import styles from './StatsPage.module.css'

export function StatsPage() {
  const { data: stats, isLoading } = useStudyStats()
  const { data: collectionsData } = useCollections()
  const streak = stats?.streak ?? 0
  const collections = collectionsData?.collections ?? []

  if (isLoading) {
    return <div className={styles.loading}>Loading stats...</div>
  }

  const accuracy = stats?.accuracy ?? 0
  const accuracyColor = accuracy >= 80 ? '#c8f55a' : accuracy >= 50 ? '#ffe44d' : '#ffb3d9'

  const collectionsList = stats?.collectionsData ?? collections.map(c => ({
    id: c.id,
    name: c.name,
    emoji: c.emoji,
    total: c._count.cards,
    learned: 0,
  }))

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Statistics</h1>
      <p className={styles.sub}>Your learning progress</p>

      <div className={styles.topRow}>
        <div className={`${styles.bigStat} ${styles.green}`}>
          <img src="/characters/trophy.png" alt="Trophy" className={styles.statChar} />
          <div className={styles.bigVal}>{stats?.learnedCards ?? 0}</div>
          <div className={styles.bigLabel}>Words learned</div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="ti ti-target" aria-hidden="true" />
            </div>
            <div className={styles.statVal}>{stats?.accuracy ?? 0}%</div>
            <div className={styles.statLabel}>Accuracy</div>
            <div className={styles.statBar}>
              <div
                className={styles.statBarFill}
                style={{
                  width: `${stats?.accuracy ?? 0}%`,
                  background: accuracyColor,
                }}
              />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="ti ti-cards" aria-hidden="true" />
            </div>
            <div className={styles.statVal}>{stats?.totalCards ?? 0}</div>
            <div className={styles.statLabel}>Total cards</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="ti ti-clock" aria-hidden="true" />
            </div>
            <div className={styles.statVal}>{stats?.dueCards ?? 0}</div>
            <div className={styles.statLabel}>Due today</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="ti ti-folder" aria-hidden="true" />
            </div>
            <div className={styles.statVal}>{stats?.collections ?? 0}</div>
            <div className={styles.statLabel}>Collections</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Collections progress</h2>
        {collectionsList.length === 0 ? (
          <div className={styles.empty}>No collections yet</div>
        ) : (
          <div className={styles.collectionsList}>
            {collectionsList.map((col) => {
              const percent = col.total > 0
                ? Math.round((col.learned / col.total) * 100)
                : 0
              return (
                <div key={col.id} className={styles.collectionRow}>
                  <span className={styles.colEmoji}>{col.emoji}</span>
                  <div className={styles.colInfo}>
                    <div className={styles.colTop}>
                      <span className={styles.colName}>{col.name}</span>
                      <span className={styles.colCount}>
                        {col.total} cards · {percent}%
                      </span>
                    </div>
                    <div className={styles.colBar}>
                      <div
                        className={styles.colBarFill}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Progress overview</h2>
        <div className={styles.overviewGrid}>
          <div className={`${styles.overviewCard} ${styles.yellow}`}>
            <i className="ti ti-flame" aria-hidden="true" />
            <div className={styles.overviewVal}>{streak}</div>
            <div className={styles.overviewLabel}>Day streak</div>
          </div>
          <div className={styles.overviewCard}>
            <i className="ti ti-brain" aria-hidden="true" />
            <div className={styles.overviewVal}>{stats?.totalCards ?? 0}</div>
            <div className={styles.overviewLabel}>Total cards</div>
          </div>
          <div className={`${styles.overviewCard} ${styles.pink}`}>
            <i className="ti ti-alert-circle" aria-hidden="true" />
            <div className={styles.overviewVal}>
              {(stats?.totalCards ?? 0) - (stats?.learnedCards ?? 0)}
            </div>
            <div className={styles.overviewLabel}>Still learning</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsPage