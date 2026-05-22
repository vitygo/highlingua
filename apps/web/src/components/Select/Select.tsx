import { useState, useRef, useEffect } from 'react'
import styles from './Select.module.css'

interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function Select({ options, value, onChange, placeholder = 'Select...' }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span>{selected ? selected.label : placeholder}</span>
        <i className={`ti ti-chevron-down ${styles.icon} ${open ? styles.iconOpen : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div className={styles.dropdown}>
          {!selected && placeholder && (
            <div className={styles.option + ' ' + styles.placeholder}>
              {placeholder}
            </div>
          )}
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`${styles.option} ${opt.value === value ? styles.selected : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false) }}
            >
              {opt.label}
              {opt.value === value && (
                <i className="ti ti-check" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}