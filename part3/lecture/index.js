const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

let notes = [
  {
    id: 1,
  content: "HTML is easy",
  important: true,
  },
  {
    id: 2,
  content: "Browser can execute only JavaScript",
  important: false,
  },
  {
    id: 3,
  content: "GET and POST are the most important methods of HTTP protocol",
  important: true,
  },
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

// all notes
app.get("/api/notes", (req, res) => {
  // console.log(req);
  res.json(notes);
});

// note by id
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((el) => el.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

// update note
app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const newNote = req.body;
  console.log(id, newNote);
  const noteToBeUpdated = notes.find((el) => el.id === id);
  noteToBeUpdated.content = newNote.content;
  noteToBeUpdated.important = newNote.important;
  res.json(noteToBeUpdated);
});

// delete note
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).json(notes);
});

//new note
app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: !!body.important || false,
  };

  notes = notes.concat(note);
  res.status(201).json(note);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
