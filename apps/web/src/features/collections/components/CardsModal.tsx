import { useState } from 'react'
import { useCollectionCards, useDeleteCard } from '@/features/cards'
import { Card } from '@/api/collections'
import { CardFormModal } from './CardFormModal'
import styles from './CardsModal.module.css'

const LEVEL_COLORS: Record<string, string> = {
  A1: '#e8f5e9', A2: '#f1f8e9',
  B1: '#fff8e1', B2: '#fff3e0',
  C1: '#fce4ec', C2: '#f3e5f5',
}

interface Props {
  collectionId: string
  onClose: () => void
}

export function CardsModal({ collectionId, onClose }: Props) {
  const { data, isLoading } = useCollectionCards(collectionId)
  const { mutate: deleteCard } = useDeleteCard()
  const [editCard, setEditCard] = useState<Card | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const cards = data?.cards ?? []

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <div className={styles.header}>
            <h2 className={styles.title}>{cards.length} cards</h2>
            <div className={styles.headerBtns}>
              <button
                className={styles.addBtn}
                onClick={() => setShowAdd(true)}
              >
                <i className="ti ti-plus" aria-hidden="true" />
                Add card
              </button>
              <button className={styles.closeBtn} onClick={onClose}>
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.loading}>Loading...</div>
          ) : cards.length === 0 ? (
            <div className={styles.empty}>No cards yet</div>
          ) : (
            <div className={styles.cards}>
              {cards.map((card: Card) => (
                <div key={card.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        className={styles.level}
                        style={{ background: LEVEL_COLORS[card.level] ?? '#f5f5f5' }}
                      >
                        {card.level}
                      </span>
                      <span className={styles.pos}>{card.partOfSpeech}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        className={styles.editBtn}
                        onClick={() => setEditCard(card)}
                        aria-label="Edit card"
                      >
                        <i className="ti ti-edit" aria-hidden="true" />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteCard(card.id)}
                        aria-label="Delete card"
                      >
                        <i className="ti ti-trash" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className={styles.word}>{card.word}</div>
                  <div className={styles.translation}>{card.translation}</div>
                  {card.explanation && (
                    <p className={styles.explanation}>{card.explanation}</p>
                  )}
                  {card.examples[0] && (
                    <div className={styles.example}>
                      <div className={styles.exSentence}>"{card.examples[0].sentence}"</div>
                      <div className={styles.exTrans}>{card.examples[0].translation}</div>
                    </div>
                  )}
                  {card.synonyms.length > 0 && (
                    <div className={styles.synonyms}>
                      {card.synonyms.slice(0, 3).map((s: string) => (
                        <span key={s} className={styles.syn}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showAdd && (
        <CardFormModal
          collectionId={collectionId}
          onClose={() => setShowAdd(false)}
        />
      )}

      {editCard && (
        <CardFormModal
          collectionId={collectionId}
          card={editCard}
          onClose={() => setEditCard(null)}
        />
      )}
    </>
  )
}