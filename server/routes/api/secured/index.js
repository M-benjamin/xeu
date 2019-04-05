import { Router } from 'express'
import cors from 'cors'

import users from './users'
// import buckets from './buckets'
// import blobs from './blobs'

const api = Router({ mergeParams: true })

// a\ users
// api.use('/users', users)


export default api
