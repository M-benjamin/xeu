import { Router } from 'express'
import passport from 'passport'
import auth from './auth'
import secured from './secured'
import axios from 'axios'
import { TOKEN } from '@env'

const API_BASE = 'http://data.fixer.io/api/latest?access_key=';
const DEFAULT_VALUE = 'EUR'
const API_FIXER = `${API_BASE}${TOKEN}`;

const api = Router()

// a\ health-check endpoint
api.get('/', (req, res) => {
  res.json({
    api: 'xeu.Api',
    meta: {
      status: 'running',
      version: 'v1.0',
    },
  })
})


api.get('/xeu', async (req, res) => {
  const response = await axios.get(`${API_FIXER}&base=${DEFAULT_VALUE}&symbols=USD,TND,GBP,JPY,BOB`)
  res.json(response.data)
})
// a\ authentication
api.use('/auth', auth)
api.use('/', passport.authenticate('jwt', { session: false }), secured)




export default api
