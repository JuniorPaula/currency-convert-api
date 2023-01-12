import * as dotenv from 'dotenv'
import { MongoProvider } from '../infra/providers/mongodb'
import app from './app'

dotenv.config()
MongoProvider.connect(process.env.MONGODB_URL)
  .then(async () => {
    app.listen(process.env.PORT, () =>
      console.info(`server is running at port ${process.env.PORT}`),
    )
  })
  .catch(console.error)
