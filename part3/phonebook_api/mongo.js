const mongoose = require('mongoose')
const args = process.argv

if (args.length<3) {
  console.log('Please, give password to show all contacts on the phonebook or password, name and phone to add a new contact')
  process.exit(1)
}

const password = args[2]

const mongoUri = `mongodb+srv://rsvives:${password}@cluster0.8yvecow.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(mongoUri)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

const saveNewPerson = ()=>{
    const name = args[3]
    const phone = args[4]
    
    const person = new Person({
        name,
        phone
    })

    person.save().then(result => {
      console.log('contact saved!', result)
      mongoose.connection.close()
    })
}
const showAllPersons = ()=>{
    Person.find({}).then((persons)=>{
        console.log('all the contacts:',persons)
        mongoose.connection.close()
    })
}

switch(args.length){
    case 3:
        showAllPersons()
        break
    case 5:
        saveNewPerson()
        break
    default:
        console.error("You entered the wrong parameters. You need: [1]password [2]name [3]phone")
        process.exit(1)
}
