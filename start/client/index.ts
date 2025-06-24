const ClientController = () => import('#controllers/client/client_controller')
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.get('/:clientId', [ClientController, 'show'])
    router.get('/', [ClientController, 'index'])
    router.put('/:clientId', [ClientController, 'update'])
    router.delete('/:clientId', [ClientController, 'delete'])
})
.prefix('client')
