const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit(1)
}


const personSchema = new mongoose.Schema({
    name: String,
    number: String

})

const Person = mongoose.model('Person', personSchema)
const password = process.argv[2]
const url = `mongodb+srv://fullstackopen:${password}@fullstackopen.nr1fcts.mongodb.net/`
mongoose.set('strictQuery', false)

mongoose.connect(url, {
    family: 4
})

if (process.argv.length === 3) {
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(p => console.log(p.name, p.number))
        mongoose.connection.close()
    })
} else if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name,
        number
    })

    person.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('usage: node mongo.js <password> [name number]')
}


