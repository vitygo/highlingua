import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from '@/routes/auth.routes'
import cardsRoutes from '@/routes/cards.routes'
import collectionsRoutes from '@/routes/collections.routes'
import studyRoutes from '@/routes/study.routes'
import quizRoutes from '@/routes/quiz.routes'
import userRoutes from '@/routes/user.routes'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))


app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Highlingua API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/cards', cardsRoutes)
app.use('/api/collections', collectionsRoutes)
app.use('/api/study', studyRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`)
})