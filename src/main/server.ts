import * as dotenv from 'dotenv'
import * as express from 'express'
import { MongoProvider } from '../infra/providers/mongodb'
import { setupRoutes } from './routes'

const app = express()
app.use(express.json())
setupRoutes(app)

dotenv.config()
MongoProvider.connect(process.env.MONGODB_URL)
  .then(async () => {
    app.listen(process.env.PORT, () =>
      console.info(`server is running at port ${process.env.PORT}`),
    )
  })
  .catch(console.error)
