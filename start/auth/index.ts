const AuthController = () => import('#controllers/auth/auth_controller')
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.post('signUp', [AuthController, 'signUp'])
    router.post('verify/:clientId', [AuthController, 'verify'])
    router.post('signIn2', [AuthController, 'signIn'])
})
.prefix('auth')
