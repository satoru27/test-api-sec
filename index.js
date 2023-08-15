import express from 'express'

const app = express()
const PORT = 5001 
app.listen(PORT, () => console.log('API running on port ' + PORT))

app.get('/', (req,res) => res.json('My API is running :O'))