const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());

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

//persons
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// all persons
app.get("/api/persons", (req, res) => {
  // console.log(MAX_ID);
  res.status(200).json(persons);
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
    const duplicated = persons.find((p) => p.name === req.body.name);
    // console.log(duplicated);
    if (!duplicated) {
      const person = { id: generateId(MAX_ID), ...req.body };
      //   console.log(person);
      persons = persons.concat(person);
      res.status(201).json({ message: "new person added", person });
    } else {
      res.status(409).json({ error: "name must be unique" });
    }
  }
});

// info
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
