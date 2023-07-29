import WebSocket from "ws";
import Human from "../human";
import Commmunity from "../Community";

export default function createWebSocket() {
  const PORT = 8080;

  const wss = new WebSocket.Server({ port: PORT });

  wss.on("listening", () => {
    console.log(`Socket open at ws://localhost:${PORT}`);
  });

  wss.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  wss.on("connection", (ws) => {
    console.log("Connection Established");

    ws.on("message", (data: string) => {
      try {
        const rawHumans = JSON.parse(data);
        const humans: Human[] = [];
        for (let rawHuman of rawHumans)
          humans.push(
            new Human(
              rawHuman.name,
              rawHuman.description
                .map((desc: string, i: number) => `${i + 1}. ${desc}`)
                .join("\n")
            )
          );

        const community = new Commmunity(humans, (speakerName, dialogue) => {
          console.log(`${speakerName}: ${dialogue}`);
          ws.send(`${speakerName}: ${dialogue}`);
        });

        community.simulate();
      } catch (e) {
        console.log("Error while parsing json");
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });
}
