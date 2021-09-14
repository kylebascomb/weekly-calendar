

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

//routers
const usersRouter = require("./routes/users.js");
const eventsRouter = require("./routes/events.js")


require('dotenv').config();


//express app
const app = express();
const port = process.env.PORT || 5000;

// var corsOptions = {
//     origin: "http://localhost:3000"
//   };

// connect to MongoDB
const dbURI = process.env.ATLAS_URI;
mongoose.connect(dbURI)
    .then((result) => app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    }));;
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
  })

app.use(cors())

// passport
const passport = require("passport");
app.use(passport.initialize());
require("./middleware/passport")(passport);


app.use(express.json());

app.use('/users', usersRouter);

app.use('/events', eventsRouter);












