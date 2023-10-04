import express from "express"
import userRoutes from './routes/userRoutes'
import tweetRoutes from './routes/tweetRoutes'

const app = express()

app.use(express.json())
app.use('/user', userRoutes)
app.use('/tweet', tweetRoutes)

app.get('/', (req, res) => {
res.send('<h1>Bla-Bla</h1>')
})

app.listen(3000, () => {
    console.log('App is listening');
})