import { useState } from 'react'
import styles from './ActivityCalendar.module.css'

interface Props {
  activity: Record<string, number>
}

export function ActivityCalendar({ activity }: Props) {
    
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  console.log('activity data:', activity)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let i = 1; i <= daysInMonth; i++) cells.push(i)

    const getKey = (day: number) => {
        const d = new Date(year, month, day)
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        return `${y}-${m}-${dd}`
      }

  const getSessions = (day: number) => activity[getKey(day)] ?? 0

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const isFuture = (day: number) => {
    const cellDate = new Date(year, month, day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return cellDate > todayStart
  }
  const getCellClass = (day: number) => {
    const sessions = getSessions(day)
    const future = isFuture(day)
    const todayDay = isToday(day)
    const active = sessions > 0 && !future

    if (active && todayDay) return `${styles.cell} ${styles.active} ${styles.today}`
    if (active) return `${styles.cell} ${styles.active}`
    if (todayDay) return `${styles.cell} ${styles.today}`
    if (future) return `${styles.cell} ${styles.future}`
    return styles.cell
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.nav}>
        <button className={styles.navBtn} onClick={prevMonth}>
          <i className="ti ti-chevron-left" aria-hidden="true" />
        </button>
        <span className={styles.monthTitle}>{MONTHS[month]} {year}</span>
        <button
          className={styles.navBtn}
          onClick={nextMonth}
          disabled={isCurrentMonth}
        >
          <i className="ti ti-chevron-right" aria-hidden="true" />
        </button>
      </div>

      <div className={styles.dayNames}>
        {DAYS.map(d => <div key={d} className={styles.dayName}>{d}</div>)}
      </div>

      <div className={styles.grid}>
        {cells.map((day, i) => {
          if (day === null) return <div key={i} className={styles.emptyCell} />
          const sessions = getSessions(day)
          const future = isFuture(day)
          return (
            <div
              key={i}
              className={getCellClass(day)}
              title={future ? '' : `${getKey(day)}: ${sessions} session${sessions !== 1 ? 's' : ''}`}
            >
              <span>{day}</span>
            </div>
          )
        })}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.legendActive}`} />
          <span>Studied</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} />
          <span>No session</span>
        </div>
      </div>
    </div>
  )
}