const express = require('express')
const app = express()

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>')
})

app.get('/api/persons', (req, res) =>{
    res.send(persons)
})

app.get('/info', (req, res) => {
    const receiveTime = new Date()
    console.log(receiveTime.toISOString())
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
            ${receiveTime}`)

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})