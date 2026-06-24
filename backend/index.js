require("dotenv").config({ path: __dirname + "/.env" });
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
connectToMongo();
const app = express();
const port = 5000;

app.use(cors());

//it is used as middleware as if we want to print api request's body in json
app.use(express.json());

// available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http:localhost:${port}`);
});
