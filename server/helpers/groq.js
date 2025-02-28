const Groq = require("groq-sdk");

require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) throw new Error("Invalid GROQ API KEY");

const groq = new Groq({
  apiKey: GROQ_API_KEY, // Use the GROQ_API_KEY from the environment variable
});

const getGroqChatCompletion = async (prompt) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
    max_completion_tokens: 1024,
    top_p: 1,
    stop: null,
    stream: false,
  });
};

module.exports = getGroqChatCompletion;
