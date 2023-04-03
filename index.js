require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

morgan.token('data', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())
app.use(express.static('build'))

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// const generateId = () => {
//     let newId = Math.floor(Math.random()*1000)
//     while(persons.find(p => p.id === newId)){
//         newId = generateId()
//     }
//     return newId
// }

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>')
})

app.get('/info', (req, res) => {
    const receiveTime = new Date()
    console.log(receiveTime.toISOString())
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
            ${receiveTime}`)

})


app.get('/api/persons', (req, res) =>{
    Person.find()
        .then( persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Person.findById(id)
        .then(person => {
            console.log("Person found")
            res.send(person)
        })
        .catch(e => {
            console.log('Person not found!')
            res.status(404).end()
        })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = Person.findById(id)
    Person.findByIdAndRemove(id)
        .then(result => {
            console.log('Success deleting')
            res.status(204).end()
        })
        .catch(e => {
            console.log('Error deleting: ', e.message)
            res.status(404).end()
        })
})

app.post('/api/persons', (req, res) => {
    if(!req.body.name || !req.body.number){
        res.statusMessage = "Name or number missing"
        res.status(400).end()
    }
    // if(persons.map(p => p.name).includes(req.body.name)){
    //     res.statusMessage = "Person already exists"
    //     res.status(400).end()
    // }

    const newPerson = new Person({
        // id: generateId(),
        name: req.body.name,
        number: req.body.number
    })
    newPerson.save().then( result => {
        console.log(result)
        // persons = persons.concat(newPerson)
        res.send(newPerson)
    })
    
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})