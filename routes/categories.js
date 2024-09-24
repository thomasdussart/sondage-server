const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const Category = require("../models/categories.model");
app.use(express.json());

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

  app.post("/test", async (req, res) => {
    try {
      const testCategory = new Category({
        name: "Test",
        premier: 0,
        deuxieme: 0,
        troisieme: 0,
        quatrieme: 0,
      });
      await testCategory.save();
      console.log("Test category saved.");
      res.status(200).send("Test category saved.");
    } catch (error) {
      console.error("Error saving test category:", error);
      res.status(500).send("Test save failed.");
    }
  });
  // app.post("/data", (req, res) => {
  //   const clickOrderArray = JSON.parse(req.body.clickOrder);

  //   // Lire le fichier JSON existant
  //   fs.readFile(jsonFilePath, "utf-8", (err, data) => {
  //     if (err) {
  //       console.error("Erreur lors de la lecture du fichier JSON:", err);
  //       return;
  //     }

  //     // Parser les données JSON existantes
  //     let categoryData;
  //     try {
  //       categoryData = JSON.parse(data);
  //     } catch (parseError) {
  //       console.error("Erreur lors du parsing des données JSON:", parseError);
  //       return;
  //     }

  //     // Parcourir l'ordre des clics et mettre à jour les compteurs
  //     clickOrderArray.forEach((categoryName, index) => {
  //       const position = index + 1; // La position (1 = premier, 2 = deuxième, etc.)

  //       // Créer l'entrée pour la catégorie si elle n'existe pas
  //       if (!categoryData[categoryName]) {
  //         categoryData[categoryName] = {
  //           premier: 0,
  //           deuxième: 0,
  //           troisième: 0,
  //           quatrième: 0,
  //         };
  //       }

  //       // Incrémenter le bon compteur en fonction de la position
  //       switch (position) {
  //         case 1:
  //           categoryData[categoryName].premier++;
  //           break;
  //         case 2:
  //           categoryData[categoryName].deuxième++;
  //           break;
  //         case 3:
  //           categoryData[categoryName].troisième++;
  //           break;
  //         case 4:
  //           categoryData[categoryName].quatrième++;
  //           break;
  //       }
  //     });

  //     // Écrire à nouveau dans le fichier JSON avec les données mises à jour
  //     fs.writeFile(
  //       jsonFilePath,
  //       JSON.stringify(categoryData, null, 2),
  //       (err) => {
  //         if (err) {
  //           console.error("Erreur lors de l'écriture du fichier JSON:", err);
  //         } else {
  //           console.log("Les données ont été mises à jour avec succès.");
  //         }
  //       }
  //     );
  //   });
  // });

  app.post("/data", async (req, res) => {
    const clickOrderArray = req.body.clickOrder; // Array of categories in click order

    // Input validation: Ensure clickOrder is an array
    if (!Array.isArray(clickOrderArray)) {
      return res
        .status(400)
        .send("Invalid data format. 'clickOrder' should be an array.");
    }

    // Check that the array is not empty
    if (clickOrderArray.length === 0) {
      return res.status(400).send("The 'clickOrder' array cannot be empty.");
    }

    try {
      console.log("clickOrderArray received:", clickOrderArray);

      // Iterate over the clickOrderArray and update each category in MongoDB
      await Promise.all(
        clickOrderArray.map(async (categoryName, index) => {
          const position = index + 1; // Position in the click order (1st, 2nd, 3rd, etc.)
          console.log(
            `Processing category: ${categoryName} at position ${position}`
          );

          // Find the category by name or create a new one if it doesn't exist
          let category = await Category.findOne({ name: categoryName });

          if (!category) {
            console.log(
              `Category not found, creating new category: ${categoryName}`
            );
            category = new Category({
              name: categoryName,
              premier: 0,
              deuxieme: 0,
              troisieme: 0,
              quatrieme: 0,
            });
          } else {
            console.log(`Category found: ${categoryName}`);
          }

          // Update the respective position count
          switch (position) {
            case 1:
              category.premier += 1;
              break;
            case 2:
              category.deuxieme += 1;
              break;
            case 3:
              category.troisieme += 1;
              break;
            case 4:
              category.quatrieme += 1;
              break;
            default:
              console.warn(
                `Position ${position} not handled for category: ${categoryName}`
              );
          }

          // Log the updated category data before saving
          console.log(`Updated category ${categoryName}:`, category);

          // Save the updated category to MongoDB
          await category.save();
        })
      );

      // Send a success response back to the client
      res.status(200).send("Click data processed successfully.");
    } catch (error) {
      console.error("Error processing click data:", error);
      res.status(500).send("An error occurred while processing the data.");
    }
  });
};
