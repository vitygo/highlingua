import { Collection } from '@/api/collections'
import styles from './CollectionCard.module.css'

const BG_COLORS = ['#c8f55a', '#ffe44d', '#ffb3d9', '#b3d9ff', '#ffd9b3']

interface Props {
  collection: Collection
  onOpen: () => void
  onDelete: () => void
}

export function CollectionCard({ collection, onOpen, onDelete }: Props) {
  const bg = BG_COLORS[
    collection.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % BG_COLORS.length
  ]

  return (
    <div className={styles.card} style={{ background: bg }}>
      <div className={styles.top}>
        <div className={styles.iconContainer}>
        <img className={styles.emoji} src={`/icons/${collection.emoji}.png`}></img>
        </div>
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