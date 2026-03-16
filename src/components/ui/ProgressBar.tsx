import { memo, useMemo } from 'react'
import styles from './ProgressBar.module.css'

type H = 'xs' | 'sm' | 'md' | 'lg'

interface BarProps {
  value: number
  max?: number
  color?: string
  height?: H
  animated?: boolean
  className?: string
}

export const ProgressBar = memo(function ProgressBar({
  value,
  max = 100,
  color,
  height = 'md',
  animated = true,
  className = '',
}: BarProps) {
  const pct = useMemo(
    () => Math.min(Math.max((value / max) * 100, 0), 100),
    [value, max]
  )

  const trackCls = [styles.track, styles[height], className]
    .filter(Boolean)
    .join(' ')

  const fillCls = [styles.fill, animated && styles.animated]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={trackCls}>
      <div
        className={fillCls}
        style={{ 
          width: `${pct}%`, 
          ...(color && { background: color }) 
        }}
      />
    </div>
  )
})

interface XPBarProps {
  current: number
  max: number
  level: number
}

export const XPBar = memo(function XPBar({ current, max, level }: XPBarProps) {
  return (
    <div className={styles.xpWrap}>
      <div className={styles.xpRow}>
        <span className={styles.xpLevel}>Lv {level}</span>
        <span className={styles.xpNums}>
          {current.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>
      <ProgressBar value={current} max={max} height="md" />
    </div>
  )
})