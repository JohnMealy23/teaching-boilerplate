import * as config from '../config'
import axios from 'axios'

import './weatherHW'

axios.post(`http://localhost:${config.port}/hello`, { data: 'A message from the browser!'})
