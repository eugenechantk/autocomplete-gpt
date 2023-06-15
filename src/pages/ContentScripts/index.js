import React, { useState } from "react";
import { render } from "react-dom";

console.log("Content script works!");
console.log("Must reload extension for modifications to take effect.");

const body = document.querySelector("body");
const app = document.createElement("div");

app.id = "react-root";

const App = () => {
  React.useEffect(() => {
    console.log("Sending DOM to background script...");
    chrome.runtime.sendMessage({ action: "sendDOM", data: body.innerHTML });
  }, []);

  return <></>;
};

render(<App />, app);

