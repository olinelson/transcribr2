import openSocket from "socket.io-client"
import { API_URL } from "../config"
const socket = openSocket(API_URL)

function joinUserChannel(token, cb) {
  console.log("joined user channel")
  console.log(socket)
  socket.on("notification", notification => cb(notification))
  socket.emit("joinUserChannel", token)
}

export { joinUserChannel }
