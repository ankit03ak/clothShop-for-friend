import { io } from "socket.io-client";

export const socket = io("https://skt-api.onrender.com/", {
  withCredentials: true,
});