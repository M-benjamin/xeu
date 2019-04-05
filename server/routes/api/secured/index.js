import { Router } from 'express'
import axios from 'axios'
import cors from 'cors'

import users from './users'
// import buckets from './buckets'
// import blobs from './blobs'

const token = process.env.TOKEN
const API_BASE = 'http://data.fixer.io/api/latest?access_key=';
const DEFAULT_VALUE = 'EUR'
const API_FIXER = `${API_BASE}${token}`;

const api = Router({ mergeParams: true })

// a\ users
// api.use('/users', users)

api.get('/xeu', cors(), async (req, res) => {
  const response = axios.get(`${API_FIXER}&base=${DEFAULT_VALUE}&symbols=USD,TND,GBP,JPY,BOB`)
  res.json(response.data)
})

export default api
