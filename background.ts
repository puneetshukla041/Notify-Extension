export {}

// This name MUST match the one we put in the registry later
const HOST_NAME = "com.puneet.notify"

console.log("Connecting to native host:", HOST_NAME)

const port = chrome.runtime.connectNative(HOST_NAME)

port.onMessage.addListener((message) => {
  console.log("Received from Rust:", message)
  
  // Send data to the popup
  chrome.runtime.sendMessage({
    type: "NEW_NOTIFICATION",
    data: message
  })
})

port.onDisconnect.addListener(() => {
  if (chrome.runtime.lastError) {
    console.error("Connection failed:", chrome.runtime.lastError.message)
  } else {
    console.log("Disconnected")
  }
})