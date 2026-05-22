import { useState } from 'react'
import { useStudyCards, useStudyStats, useRateCard } from '@/features/study'
import { useCollections } from '@/features/cards'
import { Select } from '@/components/Select/Select'
import styles from './StudyPage.module.css'

export function StudyPage() {
  const [collectionId, setCollectionId] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [finished, setFinished] = useState(false)

  const { data: collectionsData } = useCollections()
  const { data, isLoading } = useStudyCards(collectionId || undefined)
  const { mutate: rateCard, isPending } = useRateCard()

  const collections = collectionsData?.collections ?? []
  const cards = data?.cards ?? []
  const currentCard = cards[currentIndex]

  const handleRate = (rating: 'easy' | 'hard' | 'repeat') => {
    if (!currentCard) return

    rateCard(
      { cardId: currentCard.id, rating },
      {
        onSuccess: () => {
          setFlipped(false)
          if (currentIndex + 1 >= cards.length) {
            setFinished(true)
          } else {
            setTimeout(() => setCurrentIndex((i) => i + 1), 300)
          }
        },
      }
    )
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setFlipped(false)
    setFinished(false)
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading cards...</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Study</h1>
          <p className={styles.sub}>
            {cards.length} cards
            {collectionId ? '' : ' · all collections'}
          </p>
        </div>
        <div className={styles.filter}>
          <Select
            options={[
              { value: '', label: 'All collections' },
              ...collections.map((c) => ({ value: c.id, label: `${c.emoji} ${c.name}` })),
            ]}
            value={collectionId}
            onChange={(v) => {
              setCollectionId(v)
              setCurrentIndex(0)
              setFlipped(false)
              setFinished(false)
            }}
          />
        </div>
      </div>

      {cards.length === 0 ? (
        <div className={styles.empty}>
          <img src="/characters/Memo.png" alt="Memo" className={styles.emptyChar} />
          <h2 className={styles.emptyTitle}>No cards to study!</h2>
          <p className={styles.emptySub}>Generate some cards first</p>
        </div>
      ) : finished ? (
        <div className={styles.finished}>
          <img src="/characters/Trophy.png" alt="Trophy" className={styles.finishedChar} />
          <h2 className={styles.finishedTitle}>Session complete!</h2>
          <p className={styles.finishedSub}>You studied {cards.length} cards</p>
          <button className={styles.restartBtn} onClick={handleRestart}>
            <i className="ti ti-refresh" aria-hidden="true" />
            Study again
          </button>
        </div>
      ) : (
        <>
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${((currentIndex) / cards.length) * 100}%` }}
              />
            </div>
            <span className={styles.progressText}>
              {currentIndex + 1} / {cards.length}
            </span>
          </div>

          <div className={styles.cardWrap}>
            <div
              className={`${styles.flashcard} ${flipped ? styles.flipped : ''}`}
              onClick={() => setFlipped((f) => !f)}
            >
              <div className={styles.cardFront}>
                <div className={styles.cardLevel}>
                  <span className={styles.levelBadge}>{currentCard?.level}</span>
                  <span className={styles.posBadge}>{currentCard?.partOfSpeech}</span>
                </div>
                <div className={styles.cardWord}>{currentCard?.word}</div>
                <p className={styles.tapHint}>
                  <i className="ti ti-hand-click" aria-hidden="true" />
                  Tap to reveal
                </p>
              </div>

              <div className={styles.cardBack}>
                <div className={styles.cardLevel}>
                  <span className={styles.levelBadge}>{currentCard?.level}</span>
                  <span className={styles.posBadge}>{currentCard?.partOfSpeech}</span>
                </div>
                <div className={styles.cardTranslation}>{currentCard?.translation}</div>
                <p className={styles.cardExplanation}>{currentCard?.explanation}</p>
                {currentCard?.examples[0] && (
                  <div className={styles.example}>
                    <div className={styles.exSentence}>
                      "{currentCard.examples[0].sentence}"
                    </div>
                    <div className={styles.exTrans}>
                      {currentCard.examples[0].translation}
                    </div>
                  </div>
                )}
                {currentCard?.synonyms.length > 0 && (
                  <div className={styles.synonyms}>
                    {currentCard.synonyms.slice(0, 3).map((s) => (
                      <span key={s} className={styles.syn}>{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {flipped && (
            <div className={styles.ratingBtns}>
              <button
                className={`${styles.rateBtn} ${styles.repeatBtn}`}
                onClick={() => handleRate('repeat')}
                disabled={isPending}
              >
                <i className="ti ti-refresh" aria-hidden="true" />
                Again
              </button>
              <button
                className={`${styles.rateBtn} ${styles.hardBtn}`}
                onClick={() => handleRate('hard')}
                disabled={isPending}
              >
                <i className="ti ti-mood-confuzed" aria-hidden="true" />
                Hard
              </button>
              <button
                className={`${styles.rateBtn} ${styles.easyBtn}`}
                onClick={() => handleRate('easy')}
                disabled={isPending}
              >
                <i className="ti ti-mood-smile" aria-hidden="true" />
                Easy
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StudyPage