import openSocket from "socket.io-client"
import { API_URL } from "../config"
// const socket = openSocket("http://127.0.0.1:3000")
const socket = openSocket(API_URL)

// function subscribeToTimer(cb) {
//   socket.on("timer", timestamp => cb(null, timestamp))
//   socket.emit("subscribeToTimer", 1000)
// }

function joinUserChannel(token, cb) {
  console.log("joined user channel")
  socket.on("notification", notification => cb(notification))
  socket.emit("joinUserChannel", token)
}

// function joinClipChannel(token, clipId, cb) {
//   console.log("joining clip channel", token, clipId)
//   socket.on("notification", notification => cb(notification))
//   socket.emit("joinClipChannel", token, clipId)
// }
export { joinUserChannel }
