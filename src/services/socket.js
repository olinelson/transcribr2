import openSocket from "socket.io-client"
import { API_URL } from "../config"
const socket = openSocket(API_URL)

function joinUserChannel(token, cb) {
  socket.on("notification", notification => cb(notification))
  socket.emit("joinUserChannel", token)
}

export { joinUserChannel }
