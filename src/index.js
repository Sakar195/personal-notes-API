const express = require("express");
const app = express();
const notesRouter = require("./routes/noteRoutes");
const { errorHandler, logger } = require("./middleware/errorHandler");
const bodyParser = require("body-parser");

// middleware setup
app.use(logger); // logger middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use("/api/notes", notesRouter); // Mounting the notesRouter

app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Welcome to Node/Express Notes API Manager</h1>
        <p>Be sure to enjoy the service!</p>
        <h2>Available Routes:</h2>
        <p style="font-weight:bold">These routes are only to read and use on postman</P>
        <ul>
          <li><a href="/api/notes">/api/notes</a>  -Get a list of all notes </li>
           
           <li><a href="/api/notes/1">/notes/:id</a> - Get a specific note by ID </li> 
           <li><a href="/api/notes/">/notes (POST)</a> - Create a new note </li> 
           <li><a href="/api/notes/1/">/notes/:id (PUT)</a> - Update an existing note by ID </li> 
           <li><a href="/api/notes/1/">/notes/:id (DELETE)</a> - Delete a note by ID </li> 
        </ul>
      </body>
    </html>
  `);
});

// always add errhandler middleware at the end
app.use(errorHandler); // Error handler middleware

//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
