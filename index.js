const express = require('express')

const app = express()

app.use(express.static(__dirname + '/public'))

const server = app.listen(8000, () => console.log('hello'))

// ------------------------------------------------------------------------------

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('Socket connection made', socket.id);

  socket.on('chat', (data) => {
    console.log(data);
    io.sockets.emit('chat', data)
  })

  socket.on('type', (data) => {
    console.log(data);
    socket.broadcast.emit('type', data)
  })
})