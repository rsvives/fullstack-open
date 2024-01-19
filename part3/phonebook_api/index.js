const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require('./models/person')

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('dist'))

morgan.token("body", function getBody(req) {
  // console.log("req", req.method);
  return JSON.stringify(req.body);
});
app.use(morgan("tiny"));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip(req, res) {
        return req.method !== "POST";
      },
    }
  )
);

const MAX_ID = Math.pow(2, 53);

const generateId = (max) => {
  return Math.floor(Math.random() * max);
};


// index
app.get("/", (req, res) => {
  res.send(
    `<h1>Phonebook app</h1>`
  );
});

// all persons
app.get("/api/persons", (req, res) => {
  Person.find({})
  .then(persons=>{
    res.status(200).json(persons);
  }).catch(err=>res.status(400).json(err))
});

// find person by id
app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const person = persons.find((p) => p.id === id);
  //   console.log(person);
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json("person does not exist");
  }
});

// delete person
app.delete("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const person = persons.find((p) => p.id === id);
  //   console.log(person);
  if (person) {
    persons = persons.filter((p) => p.id !== id);
    // console.log(persons);
    res.status(200).json({ message: "person deleted", person });
  } else {
    res.status(404).json("person does not exist");
  }
});

// new person
app.post("/api/persons", (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  } else {
    Person.find( {name:req.body.name})
    .then((result)=>{
      console.log(result);
      if (!result.length) {
        const person = new Person({...req.body})      
        person.save().then((savedPerson)=>{
          res.status(201).json({ message: `${savedPerson.name} was added`, person:savedPerson })
        })
        .catch(err=>res.status(400).json({message:'error saving new person',err}))
      } else {
        res.status(409).json({ error: "name must be unique" });
      }
    })
    .catch(err=>res.status(400).json({message:'error looking for duplicates', err}))

  }
});

//update
app.put("/api/persons", (req, res) => {
  console.log("put method");
  return res.json({ method: "put" });
});

// info
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`
  );
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
