const LoanController = () => import('#controllers/client/loan_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.post('/', [LoanController, 'request'])
    router.put('/:loanId', [LoanController, 'update'])
    router.get('/', [LoanController, 'index'])
})
    .prefix('client/:clientId/loan')
    .middleware(middleware.clientIsHimself())
