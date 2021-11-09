const dotenv = require('dotenv')
const express = require('express');
const {
    ConnectToDB
} = require('./config/db.config')
const cors = require('cors');

dotenv.config({
    path: __dirname + '/.env',
})

const app = express()

const whitelist = ['*']

var corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
}

app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use((req, res, next) => {
    express.json({
        limit: '50mb',
    })(req, res, (err) => {
        if (err) {
            console.error(err)
            return res.status(400).json({
                success: false,
            })
        }
        next()
    })
})

app.use(express.static(`${__dirname}/public`))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


app.get('/welcome', (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'Welcome to MRex api!',
    })
})
const PORT = process.env.PORT || 8010
app.listen(PORT, async () => {
    await ConnectToDB();
    console.log('working...')
})