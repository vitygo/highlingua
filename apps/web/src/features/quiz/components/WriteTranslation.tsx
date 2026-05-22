import { useState, useRef } from 'react'
import { QuizQuestion } from '@/api/quiz'
import styles from './QuizQuestion.module.css'

interface Props {
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
}

export function WriteTranslation({ question, onAnswer }: Props) {
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (!input.trim() || submitted) return
    const isCorrect = input.trim().toLowerCase() === question.correctAnswer.toLowerCase()
    setCorrect(isCorrect)
    setSubmitted(true)
    onAnswer(isCorrect)
  }

  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.modeBadge}>Write translation</span>
        <span className={styles.level}>{question.level}</span>
      </div>
      <h2 className={styles.question}>{question.question}</h2>
      {question.hint && <p className={styles.hint}>{question.hint}</p>}

      <div className={styles.writeWrap}>
        <input
          ref={inputRef}
          className={`${styles.writeInput} ${
            submitted ? (correct ? styles.writeCorrect : styles.writeWrong) : ''
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Type translation..."
          disabled={submitted}
          autoFocus
        />
        {!submitted ? (
          <button className={styles.submitBtn} onClick={handleSubmit}>
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </button>
        ) : (
          <div className={`${styles.resultIcon} ${correct ? styles.resultCorrect : styles.resultWrong}`}>
            <i className={`ti ${correct ? 'ti-check' : 'ti-x'}`} aria-hidden="true" />
          </div>
        )}
      </div>

      {submitted && !correct && (
        <div className={styles.correctAnswer}>
          Correct answer: <strong>{question.correctAnswer}</strong>
        </div>
      )}
    </div>
  )
}