import 'dotenv/config'
import app from './app'
import prisma from './config/prisma'

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  await prisma.$connect()

  console.log('Database connected')
  console.log(`Server is running on port ${PORT}`)
})
