const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "../db/categories.json");

module.exports = function (app) {
  app.get("/data", (req, res) => {
    fs.readFile(jsonFilePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier JSON:", err);
        return res.status(500).send("Erreur serveur");
      }

      res.send(data);
    });
  });

  app.post("/data", (req, res) => {
    const clickOrderArray = JSON.parse(req.body.clickOrder);

    // Lire le fichier JSON existant
    fs.readFile(jsonFilePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier JSON:", err);
        return;
      }

      // Parser les données JSON existantes
      let categoryData;
      try {
        categoryData = JSON.parse(data);
      } catch (parseError) {
        console.error("Erreur lors du parsing des données JSON:", parseError);
        return;
      }

      // Parcourir l'ordre des clics et mettre à jour les compteurs
      clickOrderArray.forEach((categoryName, index) => {
        const position = index + 1; // La position (1 = premier, 2 = deuxième, etc.)

        // Créer l'entrée pour la catégorie si elle n'existe pas
        if (!categoryData[categoryName]) {
          categoryData[categoryName] = {
            premier: 0,
            deuxième: 0,
            troisième: 0,
            quatrième: 0,
          };
        }

        // Incrémenter le bon compteur en fonction de la position
        switch (position) {
          case 1:
            categoryData[categoryName].premier++;
            break;
          case 2:
            categoryData[categoryName].deuxième++;
            break;
          case 3:
            categoryData[categoryName].troisième++;
            break;
          case 4:
            categoryData[categoryName].quatrième++;
            break;
        }
      });

      // Écrire à nouveau dans le fichier JSON avec les données mises à jour
      fs.writeFile(
        jsonFilePath,
        JSON.stringify(categoryData, null, 2),
        (err) => {
          if (err) {
            console.error("Erreur lors de l'écriture du fichier JSON:", err);
          } else {
            console.log("Les données ont été mises à jour avec succès.");
          }
        }
      );
    });
  });
};
