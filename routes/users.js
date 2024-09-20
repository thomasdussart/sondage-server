const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const jsonFilePath = path.join(__dirname, "../db/users.json");

module.exports = function (app) {
  app.get("/users", (req, res) => {
    fs.readFile(jsonFilePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier JSON:", err);
        return res.status(500).send("Erreur serveur");
      }

      res.send(data);
    });
  });

  app.post("/users/create", (req, res) => {
    const { username, password } = req.body;
    const id = uuidv4();

    // Lire le fichier JSON existant
    fs.readFile(jsonFilePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier JSON:", err);
        return res.status(500).send("Erreur serveur");
      }

      // Parser les données JSON existantes
      let userData;
      try {
        userData = JSON.parse(data);
      } catch (parseError) {
        console.error("Erreur lors du parsing des données JSON:", parseError);
        return res.status(500).send("Erreur de parsing JSON");
      }

      // convert userData to array
      userData = Object.keys(userData).map((key) => userData[key]);

      // Vérifier si l'utilisateur existe déjà
      if (userData.some((user) => user.username === username)) {
        console.log("L'utilisateur existe déjà");
        return res.status(400).send("L'utilisateur existe déjà");
      }

      // Hasher le mot de passe
      bcrypt.hash(password, 10, (hashErr, hash) => {
        if (hashErr) {
          console.error("Erreur lors du hashage du mot de passe:", hashErr);
          return res.status(500).send("Erreur serveur");
        }

        // Ajouter le nouvel utilisateur
        userData.push({ id, username, password: hash });

        // Écrire à nouveau dans le fichier JSON avec les données mises à jour
        fs.writeFile(
          jsonFilePath,
          JSON.stringify(userData, null, 2),
          (writeErr) => {
            if (writeErr) {
              console.error(
                "Erreur lors de l'écriture du fichier JSON:",
                writeErr
              );
              return res.status(500).send("Erreur lors de la sauvegarde");
            } else {
              console.log("Nouvel utilisateur créé avec succès.");
              return res.send("Utilisateur créé avec succès");
            }
          }
        );
      });
    });
  });
};
