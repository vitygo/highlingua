import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'
import styles from './Topbar.module.css'

const AVATAR_MAP: Record<string, string> = {
  lingo: '/characters/lingo.png',
  memo: '/characters/memo.png',
  sparky: '/characters/sparky.png',
  trophy: '/characters/trophy.png',
}

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/login')
  }

  const avatarSrc = AVATAR_MAP[user?.avatar ?? 'lingo'] ?? AVATAR_MAP.lingo

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

        <div className={styles.avatarWrap} ref={ref}>
          <button
            className={styles.avatarBtn}
            onClick={() => setOpen((v) => !v)}
            aria-label="Profile menu"
          >
            <img src={avatarSrc} alt="Avatar" className={styles.avatarImg} />
          </button>

          {open && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <img src={avatarSrc} alt="Avatar" className={styles.dropdownAvatar} />
                <div>
                  <div className={styles.dropdownName}>{user?.name}</div>
                  <div className={styles.dropdownEmail}>{user?.email}</div>
                </div>
              </div>

              <div className={styles.dropdownDivider} />

              <button
                className={styles.dropdownItem}
                onClick={() => { navigate('/settings'); setOpen(false) }}
              >
                <i className="ti ti-settings" aria-hidden="true" />
                Settings
              </button>
              <button
                className={styles.dropdownItem}
                onClick={() => { navigate('/stats'); setOpen(false) }}
              >
                <i className="ti ti-chart-bar" aria-hidden="true" />
                Statistics
              </button>

              <div className={styles.dropdownDivider} />

              <button
                className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                onClick={handleLogout}
              >
                <i className="ti ti-logout" aria-hidden="true" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}