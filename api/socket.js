import { Server } from "socket.io";
//import { Socket } from "socket.io";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("message", (message) => {
        // Broadcast the message to all connected clients except sender
        socket.broadcast.emit("message", message);
      });

      socket.on("typing", (isTyping) => {
        socket.broadcast.emit("typing", isTyping);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
