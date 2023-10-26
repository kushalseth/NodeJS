import express from "express";
import skiTerms from "./skie-terms.json" assert { type: "json" };
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
let skiDef = skiTerms;

app.use("/", express.static("../client"));

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log(req.body);
  }
  next();
});

app.get("/dictionary", (req, res) => {
  res.json(skiDef);
});

app.post("/dictionary", bodyParser.json(), (req, res) => {
  skiDef.push(req.body);
  save();
  res.json({
    status: "success",
    term: req.body,
  });
});

app.delete("/dictionary/:term", (req, res) => {
  skiDef = skiDef.filter(({ term }) => term != req.params.term);
  save();
  res.json({
    status: "success",
    removed: req.body,
    newLength: skiDef.length,
  });
});

const save = () => {
  fs.writeFile("./skie-terms.json", JSON.stringify(skiDef, null, 2), (err) => {
    if (err) {
      throw err;
    }
    console.log("Document Downloaded");
  });
};

app.listen(3001, () => {
  console.log("Skie Server Running at 3001");
});
