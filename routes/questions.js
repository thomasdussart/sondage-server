const express = require("express");
const app = express();
const Question = require("../models/questions.model");

module.exports = function (app) {
  app.post("/questions", async (req, res) => {
    const { category, reponse } = req.body; // Extract category and question (reponse) from request

    try {
      // Find the category in the Question collection
      const questionDoc = await Question.findOne({ category });

      // If the category does not exist, return an error
      if (!questionDoc) {
        return res
          .status(404)
          .json({ error: `Category '${category}' not found.` });
      }

      // Find the specific question in the category
      const question = questionDoc.questions.find(
        (q) => q.question.trim().toLowerCase() === reponse.trim().toLowerCase()
      );

      // If the question is not found, return an error
      if (!question) {
        return res.status(404).json({
          error: `Question '${reponse}' not found in category '${category}'.`,
        });
      }

      // Increment the count for the found question
      question.count += 1;

      // Save the updated document
      await questionDoc.save();

      res.status(200).send("Question count updated successfully.");
    } catch (error) {
      console.error("Error updating question count:", error);
      res.status(500).send("Error updating question count.");
    }
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
