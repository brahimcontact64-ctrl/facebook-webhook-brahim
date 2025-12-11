const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "brahim2025";

// -------------------------------
// GET Webhook (Verify)
// -------------------------------
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
});

// -------------------------------
// POST Webhook (Receive Events)
// -------------------------------
app.post("/webhook", (req, res) => {
  console.log("📩 New Webhook Event Received!");

  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach(entry => {
      const pageId = entry.id;

      entry.changes.forEach(change => {
        if (change.field === "feed") {
          console.log("🔥 FEED EVENT from page:", pageId);
          console.log(JSON.stringify(change.value, null, 2));
        }
      });
    });

    return res.sendStatus(200);
  }

  res.sendStatus(404);
});

// -------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));