import { useStudyStats, useStudyActivity } from '@/features/study'
import { useCollections } from '@/features/cards'
import { ActivityCalendar } from '@/features/stats/components/ActivityCalendar'
import styles from './StatsPage.module.css'

export function StatsPage() {
  const { data: stats, isLoading } = useStudyStats()
  const { data: collectionsData } = useCollections()
  const { data: activityData } = useStudyActivity()
  const streak = stats?.streak ?? 0
  const collections = collectionsData?.collections ?? []

  if (isLoading) {
    return <div className={styles.loading}>Loading stats...</div>
  }

  const accuracy = stats?.accuracy ?? 0
  const accuracyColor = accuracy >= 80 ? '#c8f55a' : accuracy >= 50 ? '#ffe44d' : '#ffb3d9'

  const collectionsList = stats?.collectionsData ?? collections.map(c => ({
    id: c.id, name: c.name, emoji: c.emoji,
    total: c._count.cards, learned: 0,
  }))

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Statistics</h1>
      <p className={styles.sub}>Your learning progress</p>

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <div className={styles.bento}>
            <div className={`${styles.card} ${styles.cardGreen}`}>
              <img src="/characters/trophy.png" alt="Trophy" className={styles.char} />
              <div className={styles.bigNum}>{stats?.learnedCards ?? 0}</div>
              <div className={styles.bigLabel}>Words learned</div>
            </div>

            <div className={styles.card}>
              <i className="ti ti-target" aria-hidden="true" />
              <div className={styles.num}>{accuracy}%</div>
              <div className={styles.label}>Accuracy</div>
              <div className={styles.bar}>
                <div className={styles.barFill} style={{ width: `${accuracy}%`, background: accuracyColor }} />
              </div>
            </div>

            <div className={`${styles.card} ${styles.cardYellow}`}>
              <i className="ti ti-flame" aria-hidden="true" />
              <div className={styles.num}>{streak}</div>
              <div className={styles.label}>Day streak</div>
            </div>

            <div className={styles.card}>
              <i className="ti ti-cards" aria-hidden="true" />
              <div className={styles.num}>{stats?.totalCards ?? 0}</div>
              <div className={styles.label}>Total cards</div>
            </div>

            <div className={`${styles.card} ${styles.cardPink}`}>
              <i className="ti ti-brain" aria-hidden="true" />
              <div className={styles.num}>{(stats?.totalCards ?? 0) - (stats?.learnedCards ?? 0)}</div>
              <div className={styles.label}>Still learning</div>
            </div>

            <div className={styles.card}>
              <i className="ti ti-calendar-due" aria-hidden="true" />
              <div className={styles.num}>{stats?.dueCards ?? 0}</div>
              <div className={styles.label}>To review today</div>
            </div>

            <div className={styles.card}>
              <i className="ti ti-folder" aria-hidden="true" />
              <div className={styles.num}>{stats?.collections ?? 0}</div>
              <div className={styles.label}>Collections</div>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.cardWide}>
            <div className={styles.cardTitle}>Activity</div>
            <ActivityCalendar activity={activityData?.activity ?? {}} />
          </div>

          <div className={styles.cardWide}>
            <div className={styles.cardTitle}>Collections progress</div>
            {collectionsList.length === 0 ? (
              <div className={styles.empty}>No collections yet</div>
            ) : (
              <div className={styles.colList}>
                {collectionsList.map((col) => {
                  const percent = col.total > 0 ? Math.round((col.learned / col.total) * 100) : 0
                  return (
                    <div key={col.id} className={styles.colRow}>
                      <span className={styles.colEmoji}>{col.emoji}</span>
                      <div className={styles.colInfo}>
                        <div className={styles.colTop}>
                          <span className={styles.colName}>{col.name}</span>
                          <span className={styles.colCount}>{col.total} cards · {percent}%</span>
                        </div>
                        <div className={styles.colBar}>
                          <div className={styles.colBarFill} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsPage