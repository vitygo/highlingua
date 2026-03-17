import { memo, useCallback } from 'react'
import { useUser } from '@/contexts/UserContext'
import { XPBar } from '@/components/ui/ProgressBar'
import type { PageId } from '@/types'
import styles from './Sidebar.module.css'
import { useTheme } from '@/contexts/ThemeContext'


const NAV: Array<{ section: string } | { id: PageId; icon: string; label: string; badge?: string }> = [
  { section: 'Learn' },
  { id: 'dashboard', icon: '@', label: 'Dashboard' },
  { id: 'lessons', icon: '@', label: 'Lessons',    badge: '3' },
  { id: 'practice', icon: '@', label: 'Practice' },
  { id: 'challenges', icon: '@', label: 'Challenges', badge: '!' },
  { section: 'Social' },
  { id: 'leaderboard', icon: '@', label: 'Leaderboard' },
  { id: 'community', icon: '@', label: 'Community' },
  { section: 'You' },
  { id: 'profile', icon: '@', label: 'Profile' },
  { id: 'admin', icon: '@', label: 'Admin' },
]

interface Props {
  active?: PageId
  onNav?: (p: PageId) => void
  open?: boolean
}


const NavItem = memo(function NavItem({
  id, icon, label, badge, isActive, onClick,
}: {
  id: PageId; icon: string; label: string; badge?: string; isActive: boolean; onClick: () => void
}) {
  return (
    <button
      className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
      onClick={onClick}
    >
      <span className={styles.itemIcon}>{icon}</span>
      <span className={styles.itemLabel}>{label}</span>
      {badge && (
        <span className={`${styles.badge} ${badge === '!' ? styles.badgeAlert : ''}`}>
          {badge}
        </span>
      )}
      {isActive && <span className={styles.activeBar} />}
    </button>
  )
})


const SidebarFooter = memo(function SidebarFooter() {
  const { user } = useUser()

  return (
    <div className={styles.footer}>
      <div className={styles.userCard}>
        <div className={styles.userTop}>
          <div className={styles.ava}>{user.avatar}</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userMeta}>🔥{user.streak}-day streak</div>
          </div>
          <div className={styles.gemCount}>
            <span>💎</span>
            <span>{user.gems}</span>
          </div>
        </div>
        <XPBar current={user.xp} max={user.maxXp} level={user.level} />
      </div>
    </div>
  )
})


const Sidebar = memo(function Sidebar({ active, onNav, open }: Props) {
  const { dark } = useTheme()

  const makeHandler = useCallback((id: PageId) => () => onNav?.(id), [onNav])

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <div className={styles.brand}>
        <img src={dark ? "./17.svg" : "./18.svg"} alt="brand logo" style={{width: "100%"}}></img>
      </div>

      <nav className={styles.nav}>
        {NAV.map((item, i) => {
          if ('section' in item) {
            return <div key={i} className={styles.section}>{item.section}</div>
          }
          return (
            <NavItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              isActive={active === item.id}
              onClick={makeHandler(item.id)}
            />
          )
        })}
      </nav>

      <SidebarFooter />
    </aside>
  )
})

export default Sidebar