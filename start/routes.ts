/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import './auth/index.js'
import './client/index.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
