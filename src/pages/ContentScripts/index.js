import React, { useState } from "react";
import { render } from "react-dom";

console.log("Content script works!");
console.log("Must reload extension for modifications to take effect.");

const body = document.querySelector("body");
const app = document.createElement("div");

// const threadContainer = document.getElementsByClassName("flex flex-col text-sm dark:bg-gray-800")[0];

app.id = "react-root";

async function scrapeChatGPTSession() {
  return new Promise(resolve => {
    const checkExistence = () => {
      console.log('Checking existence of conversation container...')
      const element = document.getElementsByClassName(
        "flex flex-col text-sm dark:bg-gray-800"
      )[0];
      if (element) {
        // Element found, resolve the promise
        let model;
        const modelElement = element.firstChild;
        model = modelElement.innerText;
        const conversationData = {
          title: document.title,
          model,
          items: [],
        };
        for (const node of element.children) {
          const markdown = node.querySelector(".markdown");
      
          // tailwind class indicates human or gpt
          if ([...node.classList].includes("dark:bg-gray-800")) {
            const warning = node.querySelector(".text-orange-500");
            if (warning) {
              conversationData.items.push({
                from: "human",
                value: warning.innerText.split("\n")[0],
              });
            } else {
              const text = node.querySelector(".whitespace-pre-wrap");
              conversationData.items.push({
                from: "human",
                value: text.textContent,
              });
            }
            // if it's a GPT response, it might contain code blocks
          } else if (markdown) {
            conversationData.items.push({
              from: "gpt",
              value: markdown.outerHTML,
            });
          }
        }
        resolve(conversationData);
      } else {
        // Element not found, wait and check again
        setTimeout(checkExistence, 100); // Wait for 100ms
      }
    };

    checkExistence();
  });
}



const App = () => {
  const fetchConversationData = async () => {
    const conversationData = await scrapeChatGPTSession();
    console.log('Conversation data scraped:', conversationData)
    chrome.runtime.sendMessage({ action: "sendConvData", data: conversationData });
  }
  React.useEffect(() => {
    console.log("Sending DOM to background script...");
    fetchConversationData()
  }, []);

  return <></>;
};


render(<App />, app);



// Check if the document is already loaded
// if (document.readyState === "complete" || document.readyState === "interactive") {
//   initializeExtension();
// } else {
//   document.addEventListener("DOMContentLoaded", initializeExtension);
// }

// function initializeExtension() {
//   render(<App />, app);

//   // Output success message when the document is loaded
//   console.log("Document is loaded successfully!");
// }


