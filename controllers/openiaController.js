const dotenv = require("dotenv");
dotenv.config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Summarize the following:\n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (response && response.choices && response.choices[0] && response.choices[0].text) {
      return res.status(200).json({ summary: response.choices[0].text });
    } else {
      return res.status(404).json({
        message: "Summary not found in the response.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "An error occurred while generating the summary.",
    });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Write a detailed paragraph about\n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (response && response.choices && response.choices[0] && response.choices[0].text) {
      return res.status(200).json({ paragraph: response.choices[0].text });
    } else {
      return res.status(404).json({
        message: "Paragraph not found in the response.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "An error occurred while generating the paragraph.",
    });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Answer a question similar to how Yoda from Star Wars would respond.\nMe: 'What is your name?'\nYoda: 'Yoda is my name'\nMe: ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });
    if (response && response.choices && response.choices[0] && response.choices[0].text) {
      return res.status(200).json({ yodaResponse: response.choices[0].text });
    } else {
      return res.status(404).json({
        message: "Yoda's response not found in the response.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "An error occurred while generating Yoda's response.",
    });
  }
};

exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "text-davinci-002",
      prompt: `/* Convert these instructions into JavaScript code:\n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });

    if (response && response.choices && response.choices[0] && response.choices[0].text) {
      return res.status(200).json({ generatedCode: response.choices[0].text });
    } else {
      return res.status(404).json({
        message: "JavaScript code not found in the response.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "An error occurred while generating JavaScript code.",
    });
  }
};

exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.images.generate({
      prompt: `Generate a sci-fi image of ${text}`,
      n: 1,
      size: "512x512",
    });

    if (response && response.data && response.data[0] && response.data[0].url) {
      return res.status(200).json({ imageUrl: response.data[0].url });
    } else {
      return res.status(404).json({
        message: "Image URL not found in the response.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "An error occurred while generating the sci-fi image.",
    });
  }
};