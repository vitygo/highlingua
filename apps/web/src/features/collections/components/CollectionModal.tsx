import { useState } from 'react'
import { useCreateCollection } from '@/features/cards'
import styles from './CollectionModal.module.css'

const EMOJIS = ['📚', '✈️', '🍕', '💼', '🏠', '🎵', '💪', '🌍', '🎓', '💬']

interface Props {
  onClose: () => void
}

export function CollectionModal({ onClose }: Props) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('📚')
  const { mutate: create, isPending } = useCreateCollection()

  const handleSubmit = () => {
    if (!name.trim()) return
    create({ name, emoji }, { onSuccess: onClose })
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
          <label className={styles.label}>Emoji</label>
          <div className={styles.emojis}>
            {EMOJIS.map((e) => (
              <button
                key={e}
                className={`${styles.emojiBtn} ${emoji === e ? styles.emojiSelected : ''}`}
                onClick={() => setEmoji(e)}
              >
                {e}
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