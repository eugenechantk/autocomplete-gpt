import { OpenAIApi, Configuration } from "openai";

console.log("background script has loaded");
console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
// Creating a new instance of the OpenAI class and passing in the OPENAI_KEY environment variable
const openai = new OpenAIApi(configuration);
const topic = 'NodeJs';
const model = 'gpt-3.5-turbo';
// Function to generate the prompt for the OpenAI API 
// In the future, it will be moved to a helper class in the next code review
const generatePrompt = (topic) => {
    return `Write an blog post about "${topic}", it should in HTML format, include 5 unique points, using informative tone.`
};
// Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model and max token value
const chat_completion = await openai.createChatCompletion({
  model: model,
  messages: [{ role: "user", content: generatePrompt(topic) }],
});
console.log(chat_completion);


chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.action === "sendDOM") {
    console.log("Background script received dom content from content script")
    // Access the DOM content sent from the content script
    var domContent = msg.data;

    // Perform any desired operations with the DOM content in the background script
    console.log(domContent);
    console.log(msg.action);
  }
  else if (msg.action === "sendConvData") {
    console.log('Background script received conversation data from content script')
    console.log(msg.data)
  }
});

console.log('Background script has finished running')
