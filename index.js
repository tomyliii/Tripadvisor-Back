require("dotenv").config();
const cors = require("cors");
const express = require("express");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "Bienvenue sur Tripadvisor!" });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(400).json({ message: error.message });
    }
  }
});
app.post("/form", async (req, res) => {
  try {
    const { firstname, lastname, email, message } = req.body;
    const mailgun = new Mailgun(formData);
    const client = mailgun.client({
      username: "Thomas S",
      key: process.env.MAILGUN_API_KEY,
    });

    const messageData = {
      from: `${firstname} ${lastname} <${email}>`,
      to: `seabra.thomas@gmail.com `,
      text: message,
    };

    const response = await client.messages.create(
      process.env.MAILGUN_DOMAIN,
      messageData
    );

    res.status(200).json({ message: "Votre message a bien été envoyé." });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return res.status(400).json({ message: error.message });
    }
  }
});
app.all("*", (req, res) => {
  try {
    return res.status(404).json({ message: "Page introuvable." });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ mesage: error.message });
    } else {
      return res.status(400).json({ message: error.message });
    }
  }
});
app.listen(process.env.PORT, () => {
  console.log("Vous êtes connecté via le port " + process.env.PORT + " .");
});
