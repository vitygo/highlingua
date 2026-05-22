import { useState } from 'react'
import { QuizQuestion } from '@/api/quiz'
import styles from './QuizQuestion.module.css'

interface Props {
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
}

export function MultipleChoice({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
    const correct = option === question.correctAnswer
    onAnswer(correct)
  }

  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.modeBadge}>Multiple choice</span>
        <span className={styles.level}>{question.level}</span>
      </div>
      <h2 className={styles.question}>{question.question}</h2>
      <p className={styles.hint}>Choose the correct translation</p>
      <div className={styles.options}>
        {question.options?.map((option) => {
          let state = ''
          if (selected) {
            if (option === question.correctAnswer) state = styles.correct
            else if (option === selected) state = styles.wrong
          }
          return (
            <button
              key={option}
              className={`${styles.option} ${state}`}
              onClick={() => handleSelect(option)}
              disabled={!!selected}
            >
              {option}
              {selected && option === question.correctAnswer && (
                <i className="ti ti-check" aria-hidden="true" />
              )}
              {selected && option === selected && option !== question.correctAnswer && (
                <i className="ti ti-x" aria-hidden="true" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}