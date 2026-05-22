import { toast } from 'sonner'
import { useState } from 'react'
import { useCollections, useDeleteCollection } from '@/features/cards'
import { CollectionCard } from '@/features/collections/components/CollectionCard'
import { CollectionModal } from '@/features/collections/components/CollectionModal'
import { CardsModal } from '@/features/collections/components/CardsModal'
import styles from './CollectionsPage.module.css'

export function CollectionsPage() {
  const { data, isLoading } = useCollections()
  const { mutate: deleteCollection } = useDeleteCollection()
  const [showCreate, setShowCreate] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const collections = data?.collections ?? []

  const handleDelete = (id: string) => {
   toast.custom((t) => (
  <div style={{
    background: '#fff',
    border: '2.5px solid #1a1a1a',
    boxShadow: '4px 4px 0 #1a1a1a',
    borderRadius: '8px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    fontFamily: 'Arial Black',
    width: '356px',
  }}>
    <p style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase' }}>
      Delete this collection?
    </p>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        onClick={() => { deleteCollection(id); toast.dismiss(t) }}
        style={{
          flex: 1, background: '#ffb3d9', border: '2px solid #1a1a1a',
          borderRadius: '6px', padding: '0.5rem', fontWeight: 900,
          fontSize: '0.72rem', textTransform: 'uppercase', cursor: 'pointer',
        }}
      >
        Delete
      </button>
      <button
        onClick={() => toast.dismiss(t)}
        style={{
          flex: 1, background: '#c8f55a', border: '2px solid #1a1a1a',
          borderRadius: '6px', padding: '0.5rem', fontWeight: 900,
          fontSize: '0.72rem', textTransform: 'uppercase', cursor: 'pointer',
        }}
      >
        Cancel
      </button>
    </div>
  </div>
), { style: { padding: 0, border: 'none', boxShadow: 'none', background: 'none' } })
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My collections</h1>
          <p className={styles.sub}>{collections.length} collections</p>
        </div>
        <button className={styles.createBtn} onClick={() => setShowCreate(true)}>
          <i className="ti ti-plus" aria-hidden="true" />
          New collection
        </button>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : collections.length === 0 ? (
        <div className={styles.empty}>
          <img src="/characters/memo.png" alt="Memo" className={styles.emptyChar} />
          <h2 className={styles.emptyTitle}>No collections yet!</h2>
          <p className={styles.emptySub}>Create a collection to organize your cards</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {collections.map((col) => (
            <CollectionCard
              key={col.id}
              collection={col}
              onOpen={() => setSelectedId(col.id)}
              onDelete={() => handleDelete(col.id)}
            />
          ))}
        </div>
      )}

      {showCreate && (
        <CollectionModal onClose={() => setShowCreate(false)} />
      )}

      {selectedId && (
        <CardsModal
          collectionId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}

export default CollectionsPage