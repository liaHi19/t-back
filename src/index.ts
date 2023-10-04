import express from "express"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
res.send('<h1>Bla-Bla</h1>')
})

app.listen(3000, () => {
    console.log('App is listening');
})