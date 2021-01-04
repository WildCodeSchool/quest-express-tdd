// app.js
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();
const connection = require("./connection");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.status(200).json({ message: "Hello World!" }));

app.get("/bookmarks/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  connection.query(
    "SELECT * FROM bookmark WHERE id = ?",
    [id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(404).send({ error: "Bookmark not found" });
      }
      res.status(200).json(result);
    }
  );
});

app.post("/bookmarks", (req, res) => {
  const { url, title } = req.body;

  if (!url || !title) {
    return res.status(422).send({ error: "required field(s) missing" });
  }

  connection.query(
    "INSERT INTO bookmark(url,title) VALUES(?,?)",
    [url, title],
    (err, results) => {
      if (err) {
        res.status(422).send({ error: "required field(s) missing" });
      } else {
        connection.query(
          "SELECT * FROM bookmark WHERE id = ?",
          [results.insertId],
          (err, result) => {
            res.status(200).json(result[0]);
          }
        );
      }
    }
  );
});

module.exports = app;
