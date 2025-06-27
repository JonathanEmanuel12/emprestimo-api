const LoanController = () => import('#controllers/client/loan_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.post('/', [LoanController, 'request'])
    // router.get('/:itemId', [ItemController, 'show'])
    // router.get('/', [ItemController, 'index'])
    // router.put('/:itemId', [ItemController, 'update'])
    // router.delete('/:itemId', [ItemController, 'delete'])
})
    .prefix('client/:clientId/loan')
    .middleware(middleware.clientIsHimself())
