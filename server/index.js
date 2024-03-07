import express from 'express'
import 'dotenv/config'
import db from './db.js'
import router from './routes/index.js'
import cors from 'cors'
import errorHandler from './middlewares/ErrorHandlingMiddleware.js'
import path from 'path'
import fileUpload from 'express-fileupload'

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)


const start = async () => {
    try {
        await db.authenticate()
        await db.sync()
        app.listen(PORT, () => console.log('server listening on port ' + PORT))
    } catch (error) {
        console.log(error)
    }
}

start()
