import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'
import styles from './Sidebar.module.css'

const navItems = [
  { to: '/dashboard', icon: 'ti-home', label: 'Dashboard' },
  { to: '/generate', icon: 'ti-sparkles', label: 'Generate' },
  { to: '/collections', icon: 'ti-cards', label: 'My cards' },
  { to: '/study', icon: 'ti-brain', label: 'Study' },
  { to: '/quiz', icon: 'ti-target', label: 'Quiz' },
  { to: '/stats', icon: 'ti-chart-bar', label: 'Stats' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/login')
  }

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logo}>
          <i className="ti ti-cards" aria-hidden="true" />
          Highlingua
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={onClose}
            >
              <i className={`ti ${item.icon}`} aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.bottom}>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            onClick={onClose}
          >
            <i className="ti ti-settings" aria-hidden="true" />
            Settings
          </NavLink>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <i className="ti ti-logout" aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>
    </>
  )
}