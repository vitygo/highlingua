import { memo, type ButtonHTMLAttributes, type ReactNode } from 'react'
import styles from './Button.module.css'

export type BtnVariant = 'iris' | 'rose' | 'jade' | 'amber' | 'coral' | 'ghost' | 'outline' | 'danger'
export type BtnSize = 'xs' | 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?: BtnSize
  fullWidth?: boolean
  loading?: boolean
  children: ReactNode
}

const Button = memo(function Button({
  variant = 'iris',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  children,
  disabled,
  ...rest
}: Props) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth && styles.full,
    loading && styles.loading,
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  )
})

export default Button