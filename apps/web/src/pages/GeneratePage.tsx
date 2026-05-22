import { useState } from 'react'
import { useGenerateCards, useSaveCards, useCollections, useCreateCollection } from '@/features/cards'
import { GeneratedCard } from '@/api/cards'
import { toast } from 'sonner'
import styles from './GeneratePage.module.css'
import { Select } from '@/components/Select/Select'

const LANGUAGES = [
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Polish', label: 'Polish' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Portuguese', label: 'Portuguese' },
]

const LEVEL_COLORS: Record<string, string> = {
  A1: styles.levelA1,
  A2: styles.levelA2,
  B1: styles.levelB1,
  B2: styles.levelB2,
  C1: styles.levelC1,
  C2: styles.levelC2,
}

export function GeneratePage() {
  const [words, setWords] = useState('')
  const [nativeLanguage, setNativeLanguage] = useState('Ukrainian')
  const [targetLanguage, setTargetLanguage] = useState('English')
  const [generatedCards, setGeneratedCards] = useState<GeneratedCard[]>([])
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set())
  const [collectionId, setCollectionId] = useState('')
  const [newCollectionName, setNewCollectionName] = useState('')
  const [showNewCollection, setShowNewCollection] = useState(false)

  const { mutate: generate, isPending: isGenerating } = useGenerateCards()
  const { mutate: save, isPending: isSaving } = useSaveCards()
  const { mutate: createCollection } = useCreateCollection()
  const { data: collectionsData } = useCollections()

  const collections = collectionsData?.collections ?? []

  const handleGenerate = () => {
    if (!words.trim()) {
      toast.error('Enter at least one word')
      return
    }
    generate(
      { words, nativeLanguage, targetLanguage },
      {
        onSuccess: (data) => {
          setGeneratedCards(data.cards)
          setSelectedCards(new Set(data.cards.map((_, i) => i)))
          toast.success(`Generated ${data.cards.length} cards!`)
        },
      }
    )
  }

  const toggleCard = (index: number) => {
    setSelectedCards((prev) => {
      const next = new Set(prev)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })
  }

  const handleSave = () => {
    if (!collectionId) {
      toast.error('Select a collection first')
      return
    }
    const cards = generatedCards.filter((_, i) => selectedCards.has(i))
    if (cards.length === 0) {
      toast.error('Select at least one card')
      return
    }
    save(
      { collectionId, cards },
      {
        onSuccess: () => {
          setGeneratedCards([])
          setSelectedCards(new Set())
          setWords('')
        },
      }
    )
  }

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return
    createCollection(
      { name: newCollectionName, emoji: '📚' },
      {
        onSuccess: (data) => {
          setCollectionId(data.collection.id)
          setNewCollectionName('')
          setShowNewCollection(false)
        },
      }
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Generate cards</h1>
        <p className={styles.sub}>Enter words and AI will create flashcards</p>
      </div>

      <div className={styles.formCard}>
      <div className={styles.langRow}>
  <div className={styles.field}>
    <label className={styles.label}>Native language</label>
    <Select
      options={LANGUAGES}
      value={nativeLanguage}
      onChange={setNativeLanguage}
    />
  </div>

  <div className={styles.arrow}>
    <i className="ti ti-arrow-right" aria-hidden="true" />
  </div>

  <div className={styles.field}>
    <label className={styles.label}>Target language</label>
    <Select
      options={LANGUAGES}
      value={targetLanguage}
      onChange={setTargetLanguage}
    />
  </div>
</div>
        <div className={styles.field}>
          <label className={styles.label}>
            Words (comma separated, max 10)
          </label>
          <textarea
            className={styles.textarea}
            placeholder="airport, luggage, boarding pass, departure..."
            value={words}
            onChange={(e) => setWords(e.target.value)}
            rows={3}
          />
          <span className={styles.hint}>
            {words.split(',').filter((w) => w.trim()).length} / 10 words
          </span>
        </div>

        <button
          className={styles.generateBtn}
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <i className="ti ti-loader-2" aria-hidden="true" />
              Generating...
            </>
          ) : (
            <>
              <i className="ti ti-sparkles" aria-hidden="true" />
              Generate cards
            </>
          )}
        </button>
      </div>

      {generatedCards.length > 0 && (
        <>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              {generatedCards.length} cards generated
            </h2>
            <span className={styles.selectedCount}>
              {selectedCards.size} selected
            </span>
          </div>

          <div className={styles.cardsGrid}>
            {generatedCards.map((card, index) => (
              <div
                key={index}
                className={`${styles.card} ${selectedCards.has(index) ? styles.cardSelected : ''}`}
                onClick={() => toggleCard(index)}
              >
                <div className={styles.cardTop}>
                  <span className={`${styles.level} ${LEVEL_COLORS[card.level] ?? ''}`}>
                    {card.level}
                  </span>
                  <div className={styles.checkbox}>
                    {selectedCards.has(index) && (
                      <i className="ti ti-check" aria-hidden="true" />
                    )}
                  </div>
                </div>
                <div className={styles.cardWord}>{card.word}</div>
                <span className={styles.pos}>{card.partOfSpeech}</span>
                <div className={styles.translation}>{card.translation}</div>
                <p className={styles.explanation}>{card.explanation}</p>
                {card.examples[0] && (
                  <div className={styles.example}>
                    <div className={styles.exSentence}>
                      "{card.examples[0].sentence}"
                    </div>
                    <div className={styles.exTranslation}>
                      {card.examples[0].translation}
                    </div>
                  </div>
                )}
                {card.synonyms.length > 0 && (
                  <div className={styles.synonyms}>
                    {card.synonyms.slice(0, 3).map((s) => (
                      <span key={s} className={styles.syn}>{s}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.saveBar}>
            <div className={styles.collectionPicker}>
              {!showNewCollection ? (
                <>
                  <Select
  options={collections.map((c) => ({ value: c.id, label: `${c.emoji} ${c.name}` }))}
  value={collectionId}
  onChange={setCollectionId}
  placeholder="Select collection..."
/>
                  <button
                    className={styles.newColBtn}
                    onClick={() => setShowNewCollection(true)}
                  >
                    <i className="ti ti-plus" aria-hidden="true" />
                    New
                  </button>
                </>
              ) : (
                <>
                  <input
                    className={styles.input}
                    placeholder="Collection name..."
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateCollection()}
                  />
                  <button
                    className={styles.newColBtn}
                    onClick={handleCreateCollection}
                  >
                    <i className="ti ti-check" aria-hidden="true" />
                    Create
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setShowNewCollection(false)}
                  >
                    <i className="ti ti-x" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={isSaving || selectedCards.size === 0}
            >
              {isSaving ? 'Saving...' : `Save ${selectedCards.size} cards`}
              <i className="ti ti-download" aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default GeneratePage