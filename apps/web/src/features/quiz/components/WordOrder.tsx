import { useState } from 'react'
import { QuizQuestion } from '@/api/quiz'
import styles from './QuizQuestion.module.css'

interface Props {
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
}

export function WordOrder({ question, onAnswer }: Props) {
  const [available, setAvailable] = useState<string[]>(question.words ?? [])
  const [arranged, setArranged] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)

  const addWord = (word: string, index: number) => {
    if (submitted) return
    setArranged([...arranged, word])
    setAvailable(available.filter((_, i) => i !== index))
  }

  const removeWord = (word: string, index: number) => {
    if (submitted) return
    setAvailable([...available, word])
    setArranged(arranged.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (arranged.length === 0 || submitted) return
    const answer = arranged.join(' ')
    const isCorrect = answer.toLowerCase() === question.correctAnswer.toLowerCase()
    setCorrect(isCorrect)
    setSubmitted(true)
    onAnswer(isCorrect)
  }

  const handleReset = () => {
    if (submitted) return
    setAvailable(question.words ?? [])
    setArranged([])
  }

  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.modeBadge}>Word order</span>
        <span className={styles.level}>{question.level}</span>
      </div>
      <h2 className={styles.question}>"{question.question}"</h2>
      <p className={styles.hint}>Arrange the words in correct order</p>

      <div className={`${styles.arrangeZone} ${
        submitted ? (correct ? styles.arrangeCorrect : styles.arrangeWrong) : ''
      }`}>
        {arranged.length === 0 ? (
          <span className={styles.arrangePlaceholder}>Tap words to arrange them here</span>
        ) : (
          arranged.map((word, i) => (
            <button
              key={i}
              className={styles.wordChip}
              onClick={() => removeWord(word, i)}
              disabled={submitted}
            >
              {word}
            </button>
          ))
        )}
      </div>

      <div className={styles.wordBank}>
        {available.map((word, i) => (
          <button
            key={i}
            className={styles.wordChipAvailable}
            onClick={() => addWord(word, i)}
            disabled={submitted}
          >
            {word}
          </button>
        ))}
      </div>

      {submitted && !correct && (
        <div className={styles.correctAnswer}>
          Correct: <strong>{question.correctAnswer}</strong>
        </div>
      )}

      {!submitted && (
        <div className={styles.wordOrderBtns}>
          <button className={styles.resetBtn} onClick={handleReset}>
            <i className="ti ti-refresh" aria-hidden="true" />
            Reset
          </button>
          <button
            className={styles.submitBtn2}
            onClick={handleSubmit}
            disabled={arranged.length === 0}
          >
            Check answer
          </button>
        </div>
      )}
    </div>
  )
}