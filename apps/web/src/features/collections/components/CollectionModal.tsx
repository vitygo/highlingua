import { useState } from 'react'
import { useCreateCollection } from '@/features/cards'
import styles from './CollectionModal.module.css'

const ICONS = [
  { id: 'food', src: '/icons/food.png', label: 'Food' },
  { id: 'house', src: '/icons/house.png', label: 'Home' },
  { id: 'music', src: '/icons/music.png', label: 'Music' },
  { id: 'speak', src: '/icons/speak.png', label: 'Speaking' },
  { id: 'sport', src: '/icons/sport.png', label: 'Sport' },
  { id: 'study', src: '/icons/study.png', label: 'Study' },
  { id: 'travel', src: '/icons/travel.png', label: 'Travel' },
  { id: 'university', src: '/icons/university.png', label: 'University' },
  { id: 'work', src: '/icons/work.png', label: 'Work' },
  { id: 'world', src: '/icons/world.png', label: 'World' },
]

interface Props {
  onClose: () => void
}

export function CollectionModal({ onClose }: Props) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('study')
  const { mutate: create, isPending } = useCreateCollection()

  const handleSubmit = () => {
    if (!name.trim()) return
    create({ name, emoji: icon }, { onSuccess: onClose })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>New collection</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            placeholder="e.g. Travel, Work, Food..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Icon</label>
          <div className={styles.emojis}>
            {ICONS.map((ic) => (
              <button
                key={ic.id}
                className={`${styles.emojiBtn} ${icon === ic.id ? styles.emojiSelected : ''}`}
                onClick={() => setIcon(ic.id)}
                title={ic.label}
              >
                <img src={ic.src} alt={ic.label} className={styles.iconImg} />
              </button>
            ))}
          </div>
        </div>

        <button
          className={styles.createBtn}
          onClick={handleSubmit}
          disabled={isPending || !name.trim()}
        >
          {isPending ? 'Creating...' : 'Create collection'}
        </button>
      </div>
    </div>
  )
}