import { Collection } from '@/api/collections'
import styles from './CollectionCard.module.css'

const BG_COLORS = ['#c8f55a', '#ffe44d', '#ffb3d9', '#b3d9ff', '#ffd9b3']

interface Props {
  collection: Collection
  onOpen: () => void
  onDelete: () => void
}

export function CollectionCard({ collection, onOpen, onDelete }: Props) {
  const bg = BG_COLORS[collection.name.length % BG_COLORS.length]

  return (
    <div className={styles.card} style={{ background: bg }}>
      <div className={styles.top}>
        <span className={styles.emoji}>{collection.emoji}</span>
        <button
          className={styles.deleteBtn}
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          aria-label="Delete collection"
        >
          <i className="ti ti-trash" aria-hidden="true" />
        </button>
      </div>
      <div className={styles.name}>{collection.name}</div>
      <div className={styles.count}>
        {collection._count.cards} cards
      </div>
      <button className={styles.openBtn} onClick={onOpen}>
        <i className="ti ti-cards" aria-hidden="true" />
        View cards
      </button>
    </div>
  )
}