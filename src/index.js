import { printWeather } from './weather'
import * as config from '../config'
import axios from 'axios'

const userCity = 'New York'

printWeather(userCity)

axios.post(`http://localhost:${config.port}/hello`, { data: 'A message from the browser!'})
