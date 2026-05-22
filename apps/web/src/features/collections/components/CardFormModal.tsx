import { useState, useEffect } from 'react'
import { useCreateCard, useUpdateCard } from '@/features/cards'
import { Card } from '@/api/collections'
import { Select } from '@/components/Select/Select'
import styles from './CardFormModal.module.css'

const LEVELS = [
  { value: 'A1', label: 'A1' },
  { value: 'A2', label: 'A2' },
  { value: 'B1', label: 'B1' },
  { value: 'B2', label: 'B2' },
  { value: 'C1', label: 'C1' },
  { value: 'C2', label: 'C2' },
]

const PARTS_OF_SPEECH = [
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'adjective', label: 'Adjective' },
  { value: 'adverb', label: 'Adverb' },
  { value: 'phrase', label: 'Phrase' },
  { value: 'other', label: 'Other' },
]

interface Props {
  collectionId: string
  card?: Card
  onClose: () => void
}

export function CardFormModal({ collectionId, card, onClose }: Props) {
  const isEdit = !!card
  const { mutate: createCard, isPending: isCreating } = useCreateCard()
  const { mutate: updateCard, isPending: isUpdating } = useUpdateCard()

  const [word, setWord] = useState(card?.word ?? '')
  const [translation, setTranslation] = useState(card?.translation ?? '')
  const [explanation, setExplanation] = useState(card?.explanation ?? '')
  const [partOfSpeech, setPartOfSpeech] = useState(card?.partOfSpeech ?? 'noun')
  const [level, setLevel] = useState(card?.level ?? 'A1')
  const [synonymsText, setSynonymsText] = useState(card?.synonyms.join(', ') ?? '')
  const [examples, setExamples] = useState(
    card?.examples ?? [{ sentence: '', translation: '' }]
  )

  const handleAddExample = () => {
    setExamples([...examples, { sentence: '', translation: '' }])
  }

  const handleExampleChange = (index: number, field: 'sentence' | 'translation', value: string) => {
    setExamples(examples.map((ex, i) => i === index ? { ...ex, [field]: value } : ex))
  }

  const handleRemoveExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!word.trim() || !translation.trim()) return

    const synonyms = synonymsText.split(',').map(s => s.trim()).filter(Boolean)
    const validExamples = examples.filter(ex => ex.sentence.trim())

    const data = {
      word: word.trim(),
      translation: translation.trim(),
      explanation: explanation.trim(),
      partOfSpeech,
      level,
      synonyms,
      examples: validExamples,
    }

    if (isEdit) {
      updateCard({ cardId: card.id, data }, { onSuccess: onClose })
    } else {
      createCard({ ...data, collectionId }, { onSuccess: onClose })
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEdit ? 'Edit card' : 'Add card'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Word *</label>
              <input
                className={styles.input}
                value={word}
                onChange={e => setWord(e.target.value)}
                placeholder="e.g. airport"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Translation *</label>
              <input
                className={styles.input}
                value={translation}
                onChange={e => setTranslation(e.target.value)}
                placeholder="e.g. аеропорт"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Explanation</label>
            <input
              className={styles.input}
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              placeholder="Short explanation..."
            />
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Part of speech</label>
              <Select
                options={PARTS_OF_SPEECH}
                value={partOfSpeech}
                onChange={setPartOfSpeech}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Level</label>
              <Select
                options={LEVELS}
                value={level}
                onChange={setLevel}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Synonyms (comma separated)</label>
            <input
              className={styles.input}
              value={synonymsText}
              onChange={e => setSynonymsText(e.target.value)}
              placeholder="e.g. terminal, airfield"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Examples</label>
            {examples.map((ex, i) => (
              <div key={i} className={styles.exampleRow}>
                <div className={styles.exampleFields}>
                  <input
                    className={styles.input}
                    value={ex.sentence}
                    onChange={e => handleExampleChange(i, 'sentence', e.target.value)}
                    placeholder="Sentence in target language"
                  />
                  <input
                    className={styles.input}
                    value={ex.translation}
                    onChange={e => handleExampleChange(i, 'translation', e.target.value)}
                    placeholder="Translation"
                  />
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemoveExample(i)}
                >
                  <i className="ti ti-x" aria-hidden="true" />
                </button>
              </div>
            ))}
            <button className={styles.addExBtn} onClick={handleAddExample}>
              <i className="ti ti-plus" aria-hidden="true" />
              Add example
            </button>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={isCreating || isUpdating || !word.trim() || !translation.trim()}
          >
            {isCreating || isUpdating ? 'Saving...' : isEdit ? 'Save changes' : 'Add card'}
          </button>
        </div>
      </div>
    </div>
  )
}