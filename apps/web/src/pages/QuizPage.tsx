import { useState } from 'react'
import { useGenerateQuiz } from '@/features/quiz'
import { useCollections } from '@/features/cards'
import { QuizQuestion } from '@/api/quiz'
import { Select } from '@/components/Select/Select'
import { MultipleChoice } from '@/features/quiz/components/MultipleChoice'
import { WriteTranslation } from '@/features/quiz/components/WriteTranslation'
import { FillGap } from '@/features/quiz/components/FillGap'
import { WordOrder } from '@/features/quiz/components/WordOrder'
import styles from './QuizPage.module.css'

const MODES = [
    { value: 'multiple_choice', label: 'Multiple choice', icon: 'ti-list', desc: 'Choose correct translation', img: '/characters/im3.png', bg: '#c8f55a' },
    { value: 'write_translation', label: 'Write translation', icon: 'ti-pencil', desc: 'Type the answer', img: '/characters/im1.png', bg: '#ffb3d9' },
    { value: 'fill_gap', label: 'Fill the gap', icon: 'ti-text-size', desc: 'Complete the sentence', img: '/characters/im4.png', bg: '#ffe44d' },
    { value: 'word_order', label: 'Word order', icon: 'ti-arrows-sort', desc: 'Arrange the words', img: '/characters/im2.png', bg: '#fff' },
  ]

export function QuizPage() {
  const [mode, setMode] = useState('multiple_choice')
  const [collectionId, setCollectionId] = useState('')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [started, setStarted] = useState(false)

  const { data: collectionsData } = useCollections()
  const { mutate: generate, isPending } = useGenerateQuiz()

  const collections = collectionsData?.collections ?? []
  const currentQuestion = questions[currentIndex]

  const handleStart = () => {
    generate(
      { collectionId: collectionId || undefined, mode, limit: 10 },
      {
        onSuccess: (data) => {
          if (data.questions.length === 0) return
          setQuestions(data.questions)
          setCurrentIndex(0)
          setScore(0)
          setFinished(false)
          setStarted(true)
        },
      }
    )
  }

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore((s) => s + 1)
    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setFinished(true)
      } else {
        setCurrentIndex((i) => i + 1)
      }
    }, 800)
  }

  const handleExit = () => {
    setStarted(false)
    setFinished(false)
    setQuestions([])
    setCurrentIndex(0)
    setScore(0)
  }

  const handleRestart = () => {
    setStarted(false)
    setFinished(false)
    setQuestions([])
    setCurrentIndex(0)
    setScore(0)
  }

  if (!started) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Quiz</h1>
        <p className={styles.sub}>Test your knowledge</p>

        <div className={styles.setupLayout}>
  <div className={styles.setupSide}>
    <div className={styles.setupCard}>
      <div className={styles.field}>
        <label className={styles.label}>Collection</label>
        <Select
          options={[
            { value: '', label: 'All collections' },
            ...collections.map((c) => ({ value: c.id, label: `${c.emoji} ${c.name}` })),
          ]}
          value={collectionId}
          onChange={setCollectionId}
        />
      </div>

      <div className={styles.selectedMode}>
        <span className={styles.selectedModeLabel}>Mode:</span>
        <span className={styles.selectedModeName}>
          {MODES.find(m => m.value === mode)?.label}
        </span>
      </div>

      <button
        className={styles.startBtn}
        onClick={handleStart}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <i className="ti ti-loader-2" aria-hidden="true" />
            Loading...
          </>
        ) : (
          <>
            <i className="ti ti-player-play" aria-hidden="true" />
            Start quiz
          </>
        )}
      </button>
    </div>
  </div>

  <div className={styles.modesGrid}>
    {MODES.map((m) => (
     <div
     key={m.value}
     className={`${styles.modeCard} ${mode === m.value ? styles.modeSelected : ''}`}
     onClick={() => setMode(m.value)}
     style={{ background: mode === m.value ? m.bg : m.bg }}
   >
     <img src={m.img} alt={m.label} className={styles.modeCharacter} />
     <i className={`ti ${m.icon} ${styles.modeIcon}`} aria-hidden="true" />
     <div className={styles.modeLabel}>{m.label}</div>
     <div className={styles.modeDesc}>{m.desc}</div>
   </div>
    ))}
  </div>
</div>
      </div>
    )
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100)
    return (
      <div className={styles.page}>
        <div className={styles.results}>
          <img
            src={percent >= 70 ? '/characters/trophy.png' : '/characters/memo.png'}
            alt="Result"
            className={styles.resultChar}
          />
          <h2 className={styles.resultTitle}>
            {percent >= 70 ? 'Great job!' : 'Keep practicing!'}
          </h2>
          <div className={styles.scoreDisplay}>
            <span className={styles.scoreBig}>{score}</span>
            <span className={styles.scoreTotal}>/ {questions.length}</span>
          </div>
          <div className={styles.scorePercent}>{percent}% correct</div>
          <div className={styles.resultBtns}>
            <button className={styles.exitBtn} onClick={handleRestart}>
              <i className="ti ti-home" aria-hidden="true" />
              Menu
            </button>
            <button className={styles.restartBtn} onClick={handleStart}>
              <i className="ti ti-refresh" aria-hidden="true" />
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.quizHeader}>
        <button className={styles.exitQuizBtn} onClick={handleExit}>
          <i className="ti ti-arrow-left" aria-hidden="true" />
          Exit
        </button>
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className={styles.scorePill}>
          <i className="ti ti-star" aria-hidden="true" />
          {score}
        </div>
      </div>

      <div className={styles.questionWrap}>
  {currentQuestion?.mode === 'multiple_choice' && (
    <MultipleChoice key={currentIndex} question={currentQuestion} onAnswer={handleAnswer} />
  )}
  {currentQuestion?.mode === 'write_translation' && (
    <WriteTranslation key={currentIndex} question={currentQuestion} onAnswer={handleAnswer} />
  )}
  {currentQuestion?.mode === 'fill_gap' && (
    <FillGap key={currentIndex} question={currentQuestion} onAnswer={handleAnswer} />
  )}
  {currentQuestion?.mode === 'word_order' && (
    <WordOrder key={currentIndex} question={currentQuestion} onAnswer={handleAnswer} />
  )}
</div>
    </div>
  )
}

export default QuizPage