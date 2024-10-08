const express = require("express");
const app = express();

const Category = require("../models/categories.model");
app.use(express.json());

module.exports = function (app) {
  app.get("/data", async (req, res) => {
    try {
      // Use Mongoose's find() method to fetch data
      const data = await Category.find(); // This automatically returns an array of documents

      // Send the data as JSON
      res.json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    }
  });

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
