import * as cors from 'cors'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as config from '../config'

const app = express();

const origin = `http://localhost:${config.clientPort}`
const corsOptions = {
    origin,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('src'))
app.use(express.static('server'))

app.post('/hello', (request, response) => {
    const requestData = request.body.data
    console.log({ requestData })
    return response.send({
        messages: 'hello!',
        data: requestData,
    })
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}!`)
});
