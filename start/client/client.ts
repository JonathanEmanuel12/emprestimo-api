const ClientController = () => import('#controllers/client/client_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.get('/:clientId', [ClientController, 'show']).middleware(middleware.auth())
    router.get('/', [ClientController, 'index']).middleware(middleware.auth())
    router.put('/:clientId', [ClientController, 'update']).middleware(middleware.clientIsHimself())
    router.delete('/:clientId', [ClientController, 'delete']).middleware(middleware.clientIsHimself())
})
.prefix('client')
