import { useState } from 'react'
import { QuizQuestion } from '@/api/quiz'
import styles from './QuizQuestion.module.css'

interface Props {
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
}

export function FillGap({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
    onAnswer(option === question.correctAnswer)
  }

  const parts = question.question.split('___')

  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.modeBadge}>Fill the gap</span>
        <span className={styles.level}>{question.level}</span>
      </div>

      {question.translation && (
        <p className={styles.hint}>"{question.translation}"</p>
      )}

      <div className={styles.gapSentence}>
        <span>{parts[0]}</span>
        <span className={`${styles.gap} ${
          selected
            ? selected === question.correctAnswer
              ? styles.gapCorrect
              : styles.gapWrong
            : ''
        }`}>
          {selected || '___'}
        </span>
        <span>{parts[1]}</span>
      </div>

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
            </button>
          )
        })}
      </div>
    </div>
  )
}