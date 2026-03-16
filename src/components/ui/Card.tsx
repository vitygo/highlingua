import styles from "./Card.module.css";

import { memo, type ReactNode, type HTMLAttributes } from 'react'


interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  glass?: boolean
  accent?: 'iris' | 'rose' | 'jade' | 'amber'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = memo(function Card({
  children,
  hover = false,
  glass = false,
  accent,
  padding = 'md',
  className = '',
  ...rest

}: Props) {
  const cls = [styles.card, glass && styles.glass, hover && styles.hover, accent && styles[`accent_${accent}`], styles[`padding_${padding}`], className,].filter(Boolean).join(' ')

  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  )
})

export default Card