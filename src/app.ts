import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { userRoutes } from './app/modules/user/user.routes'
const app: Application = express()

// parsers
app.use(cors())
app.use(express.json())

app.use('/', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
