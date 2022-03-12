export function UpdateThreadsAtConsole(msg) {
  var actualMsgs = msg.split(";");
  if (actualMsgs[3] === "0") {
    let consoleMsg = `%cUser ${actualMsgs[0]} successfuly transfered to ${actualMsgs[1]} - ${actualMsgs[2]}$ `;
    console.log(consoleMsg, "color:green");
  } else {
    let consoleMsg = `%cUser ${actualMsgs[0]} Failed to transfered to ${actualMsgs[1]} due to overUsage...`;
    console.log(consoleMsg, "color:red");
  }
}
