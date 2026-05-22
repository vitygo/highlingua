import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from '@/routes/auth.routes'
import cardsRoutes from '@/routes/cards.routes'
import collectionsRoutes from '@/routes/collections.routes'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Highlingua API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/cards', cardsRoutes)
app.use('/api/collections', collectionsRoutes)

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`)
})