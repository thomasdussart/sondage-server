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

  app.get("/questions", async (req, res) => {
    try {
      // Use Mongoose's find() method to fetch data
      const data = await Question.find(); // This automatically returns an array of documents

      // Send the data as JSON
      res.json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    }
  });
};
