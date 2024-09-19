const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const jsonFilePathReponses = path.join(__dirname, "../db/questions.json");

module.exports = function (app) {
  app.post("/questions-mobilite", (req, res) => {
    const { reponse } = req.body; // La réponse est envoyée sous forme de string
    console.log(reponse);
    // Lire le fichier JSON existant
    fs.readFile(jsonFilePathReponses, "utf-8", (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier JSON:", err);
        return res.status(500).send("Erreur serveur");
      }

      // Parser les données JSON existantes
      let questionData;
      try {
        questionData = JSON.parse(data);
      } catch (parseError) {
        console.error("Erreur lors du parsing des données JSON:", parseError);
        return res.status(500).send("Erreur de parsing JSON");
      }

      // Rechercher la question correspondant à la réponse
      let questionTrouvee = false;

      for (const categorie in questionData) {
        for (const question in questionData[categorie]) {
          if (question === reponse) {
            // Incrémenter la valeur de la question
            questionData[categorie][question] += 1;
            questionTrouvee = true;
            break;
          }
        }
        if (questionTrouvee) break;
      }

      if (!questionTrouvee) {
        console.log("Question non trouvée");
        return res.status(400).send("Question non trouvée");
      }

      // Écrire à nouveau dans le fichier JSON avec les données mises à jour
      fs.writeFile(
        jsonFilePathReponses,
        JSON.stringify(questionData, null, 2),
        (err) => {
          if (err) {
            console.error("Erreur lors de l'écriture du fichier JSON:", err);
            return res.status(500).send("Erreur lors de la sauvegarde");
          } else {
            console.log("Les données ont été mises à jour avec succès.");
            return res.send("Mise à jour réussie");
          }
        }
      );
    });
  });

  app.post("/questions-environnement", (req, res) => {
    const { reponse } = req.body; // La réponse est envoyée sous forme de string

    // Lire le fichier JSON existant
    fs.readFile(jsonFilePathReponses, "utf-8", (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier JSON:", err);
        return res.status(500).send("Erreur serveur");
      }

      // Parser les données JSON existantes
      let questionData;
      try {
        questionData = JSON.parse(data);
      } catch (parseError) {
        console.error("Erreur lors du parsing des données JSON:", parseError);
        return res.status(500).send("Erreur de parsing JSON");
      }

      // Rechercher la question correspondant à la réponse
      let questionTrouvee = false;

      for (const categorie in questionData) {
        for (const question in questionData[categorie]) {
          if (question === reponse) {
            // Incrémenter la valeur de la question
            questionData[categorie][question] += 1;
            questionTrouvee = true;
            break;
          }
        }
        if (questionTrouvee) break;
      }

      if (!questionTrouvee) {
        return res.status(400).send("Question non trouvée");
      }

      // Écrire à nouveau dans le fichier JSON avec les données mises à jour
      fs.writeFile(
        jsonFilePathReponses,
        JSON.stringify(questionData, null, 2),
        (err) => {
          if (err) {
            console.error("Erreur lors de l'écriture du fichier JSON:", err);
            return res.status(500).send("Erreur lors de la sauvegarde");
          } else {
            console.log("Les données ont été mises à jour avec succès.");
            return res.send("Mise à jour réussie");
          }
        }
      );
    });
  });

  app.post("/questions-culture", (req, res) => {
    const { reponse } = req.body; // La réponse est envoyée sous forme de string

    // Lire le fichier JSON existant
    fs.readFile(jsonFilePathReponses, "utf-8", (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier JSON:", err);
        return res.status(500).send("Erreur serveur");
      }

      // Parser les données JSON existantes
      let questionData;
      try {
        questionData = JSON.parse(data);
      } catch (parseError) {
        console.error("Erreur lors du parsing des données JSON:", parseError);
        return res.status(500).send("Erreur de parsing JSON");
      }

      // Rechercher la question correspondant à la réponse
      let questionTrouvee = false;

      for (const categorie in questionData) {
        for (const question in questionData[categorie]) {
          if (question === reponse) {
            // Incrémenter la valeur de la question
            questionData[categorie][question] += 1;
            questionTrouvee = true;
            break;
          }
        }
        if (questionTrouvee) break;
      }

      if (!questionTrouvee) {
        return res.status(400).send("Question non trouvée");
      }

      // Écrire à nouveau dans le fichier JSON avec les données mises à jour
      fs.writeFile(
        jsonFilePathReponses,
        JSON.stringify(questionData, null, 2),
        (err) => {
          if (err) {
            console.error("Erreur lors de l'écriture du fichier JSON:", err);
            return res.status(500).send("Erreur lors de la sauvegarde");
          } else {
            console.log("Les données ont été mises à jour avec succès.");
            return res.send("Mise à jour réussie");
          }
        }
      );
    });
  });

  app.post("/questions-sport", (req, res) => {
    const { reponse } = req.body; // La réponse est envoyée sous forme de string

    // Lire le fichier JSON existant
    fs.readFile(jsonFilePathReponses, "utf-8", (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier JSON:", err);
        return res.status(500).send("Erreur serveur");
      }

      // Parser les données JSON existantes
      let questionData;
      try {
        questionData = JSON.parse(data);
      } catch (parseError) {
        console.error("Erreur lors du parsing des données JSON:", parseError);
        return res.status(500).send("Erreur de parsing JSON");
      }

      // Rechercher la question correspondant à la réponse
      let questionTrouvee = false;

      for (const categorie in questionData) {
        for (const question in questionData[categorie]) {
          if (question === reponse) {
            // Incrémenter la valeur de la question
            questionData[categorie][question] += 1;
            questionTrouvee = true;
            break;
          }
        }
        if (questionTrouvee) break;
      }

      if (!questionTrouvee) {
        console.log("Question non trouvée");
        return res.status(400).send("Question non trouvée");
      }

      // Écrire à nouveau dans le fichier JSON avec les données mises à jour
      fs.writeFile(
        jsonFilePathReponses,
        JSON.stringify(questionData, null, 2),
        (err) => {
          if (err) {
            console.error("Erreur lors de l'écriture du fichier JSON:", err);
            return res.status(500).send("Erreur lors de la sauvegarde");
          } else {
            console.log("Les données ont été mises à jour avec succès.");
            return res.send("Mise à jour réussie");
          }
        }
      );
    });
  });

  app.get("/questions", (req, res) => {
    fs.readFile(jsonFilePathReponses, "utf-8", (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier JSON:", err);
        return res.status(500).send("Erreur serveur");
      }

      res.send(data);
    });
  });
};
