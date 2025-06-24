const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.post('signUp', [AuthController, 'signUp'])
    router.post('signIn', [AuthController, 'signIn'])
    router.get('/', async () => {
        return {
          hello: 'world',
        }
      })
})
.prefix('auth')
