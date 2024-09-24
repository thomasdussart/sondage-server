const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Category name
  questions: [
    {
      question: { type: String, required: true }, // Question text
      count: { type: Number, default: 0 }, // Number of times the question was answered
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
