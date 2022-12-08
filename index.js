const express = require("express");
const { execSync } = require("child_process");
execSync("sudo apt install poppler-data");
execSync("sudo apt install poppler-utils");
const app = express();
app.use(express.json());

app.use("/api", require("./routes/pdf-extract"));

app.listen(4000, console.log("Server is running"));
