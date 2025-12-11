import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "brahim2025"; 

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});


app.post("/webhook", (req, res) => {
  console.log("NEW EVENT:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});


app.get("/", (req, res) => {
  res.send("Webhook is running!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});