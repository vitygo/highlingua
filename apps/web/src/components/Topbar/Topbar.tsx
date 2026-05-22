import { useAuthStore } from '@/store/authStore'
import styles from './Topbar.module.css'

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const user = useAuthStore((s) => s.user)

  return (
    <header className={styles.topbar}>
      <button
        className={styles.menuBtn}
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <i className="ti ti-menu-2" aria-hidden="true" />
      </button>

      <div className={styles.right}>
        <div className={styles.streak}>
          <i className="ti ti-flame" aria-hidden="true" />
          7-day streak
        </div>
        <div className={styles.avatar}>
          {user?.name?.charAt(0).toUpperCase() ?? 'U'}
        </div>
      </div>
    </header>
  )
}