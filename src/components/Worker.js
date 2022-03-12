import { UpdateThreadsAtConsole } from "../utils/Utils";
import { PATH_TO_SERVER, BANK_API_PATH_IN_SERVER } from "../utils/dbUtils";

const axios = require("axios");
var pathToRequset = PATH_TO_SERVER + BANK_API_PATH_IN_SERVER + "/Deposit";

onmessage = async function (e) {
  const activeThread = e.data.activeThread;
  const numberOfClients = e.data.numberOfClients;

  while (true) {
    let depositParams = getRandomDepositParams(activeThread, numberOfClients);
    let headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let response = await axios.post(pathToRequset, depositParams, headers);
    let msg;
    msg =
      activeThread.toString() +
      ";" +
      depositParams.ClientId.toString() +
      ";" +
      depositParams.Amount.toString() +
      ";" +
      response.data.returnStatus.toString();

    UpdateThreadsAtConsole(msg);

    waitRandomTime();
  }
};

function getRandomDepositParams(activeThread, numberOfClients) {
  return {
    RequestingClientThread: activeThread,
    ClientId: randomIntFromInterval(1, numberOfClients),
    Amount: randomIntFromInterval(1, 10),
  };
}

function waitRandomTime() {
  var d1 = Date.now();
  var randSeconds = 30 * randomIntFromInterval(1, 5);
  while (Date.now() < d1 + randSeconds) {}
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
