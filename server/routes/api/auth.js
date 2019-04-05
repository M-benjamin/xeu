import { JWT_ENCRYPTION } from '@env'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import fs from 'fs';

// import { addUserWorkspace } from 'services/storage'
import { success, error } from 'helpers/response'
import { BAD_REQUEST } from 'constants/api'

const api = Router()

/** About Sign-up
 */
api.post('/register', async (req, res) => {
  console.log('req.body', req.body)
  const {
    email, username, password
  } = req.body

  let user = {
    email, username, password
  }


  let registered = {
    users: []
  };

  registered.users.push(user);

  let json = JSON.stringify(registered);

  try {
    const payload = { uuid: 'zjbzjbe', nickname: username, email }
    const token = jwt.sign(payload, JWT_ENCRYPTION)

    console.log('DDDDDDDDDDDD', json);
    console.log('DDDDDDDDDDDD',  token);
    console.log('DDDDDDDDDDDD',  user);

    fs.writeFileSync('users.json', json, 'utf8');

    res.status(201).json(success({ user }, { token }))

  } catch (err) {
    console.log('err >>', err);
    res.status(400).json(error(BAD_REQUEST, err.message))
  }
})

/** About Login
 */
api.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return res.status(400).json(error(BAD_REQUEST, err))
    }

    const { uuid, nickname, email } = user.toJSON()

    // generate a signed json web token with the contents of user object and
    const token = jwt.sign({ uuid, nickname, email }, JWT_ENCRYPTION)

    return res.json(success({ user }, { token }))
  })(req, res, next)
})

export default api
