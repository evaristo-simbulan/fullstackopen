require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('body', request => JSON.stringify(request.body))

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get(`/api/persons/:id`, (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) response.json(person)
        else response.status(404).end()
    })
        .catch(error => next(error))
})

app.delete(`/api/persons/:id`, (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post(`/api/persons`, (request, response) => {
    const { name, number } = request.body
    if (!request.body) {
        return response.status(400).json({
            error: 'no request body'
        })
    }

    if (!name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }


    if (!number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }


    const person = new Person({
        name,
        number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})

app.put(`/api/persons/:id`, (request, response, next) => {
    const { name, number } = request.body
    if (!request.body) {
        return response.status(400).json({
            error: 'no request body'
        })
    }

    if (!name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }


    if (!number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    Person.findById(request.params.id)
        .then(person => {
            if (!person) return response.status(404).end()

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    const appInfo = `<p>Phonebook has info of ${persons.length} people</p>
    <p>${new Date().toString()}</p>`
    response.send(appInfo)
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)