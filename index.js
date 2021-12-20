const webSocket = require("ws");

const players = [];
const eggsLocation = [];

const webSocketServer = new webSocket.Server({ port: 3000 }, () => {
  console.log("Server is start!");
});

webSocketServer.on("connection", (webSocket) => {
  webSocket.on("message", (data) => {
    updatePlayerState(data);
    webSocket.send("message", players);
  });
});

webSocketServer.on("listening", () => {
  console.log("Server is listening on port 3000!");
});

const updatePlayerState = (playerData) => {
  const playerState = JSON.parse(playerData.toString());
  console.log(playerState);
  const result = players.findIndex((player) => player.uid === playerState.uid);
  if (result === -1) {
    players.push(playerState);
  } else {
    players[result] = playerState;
  }
  console.log("Players: ", players);
};

const updateEggInMap = (location) => {
  eggsLocation.push(location);
};

const generateNewEgg = () => {
  const positionXRange = Math.random() * (21 + 21) - 21;
  const positionYRange = 0;
  const positionZRange = Math.random() * (21 + 21) - 21;
  return { positionXRange, positionYRange, positionZRange };
};
