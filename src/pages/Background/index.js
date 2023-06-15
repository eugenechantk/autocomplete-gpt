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
