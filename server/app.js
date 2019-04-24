require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = 3000
const routes = require('./routes')
const CronJob = require('cron').CronJob;
const http = require('http').Server(app)
const io = require('socket.io')(http)
const axios = require('axios')

mongoose.connect('mongodb://localhost/hacktivoverflow', { useNewUrlParser: true })
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

io.on('connection', (socket) => {
    console.log('New connection has been established!')
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// new CronJob('0 0 0 * * *', function () {
new CronJob('*/10 * * * * *', function () {
    axios
        .get(`https://jobs.github.com/positions.json?search=javascript&page=${getRandomInt(0, 3)}`)
        .then(({ data }) => {
            io.emit('jobs', data)
        })
        .catch((err) => {
            console.log(err)
        })
}, null, true, 'Asia/Jakarta');

app.use('/', routes)

http.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})