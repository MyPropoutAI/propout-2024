import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = () => {
  const socketRef = (useRef < Socket) | (null > null);

  useEffect(() => {
    // In development, connect to local server
    // In production, connect to Vercel deployment
    const socketUrl =
      process.env.NODE_ENV === "production"
        ? "https://www.mypropout.com"
        : "http://localhost:5173";

    socketRef.current = io(socketUrl, {
      path: "/api/socket",
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return socketRef.current;
};
