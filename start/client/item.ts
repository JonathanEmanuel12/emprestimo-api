const ItemController = () => import('#controllers/client/item_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.group(() => {
    router.post('/', [ItemController, 'create'])
    router.get('/:itemId', [ItemController, 'show'])
    router.get('/:itemId/showToOwner', [ItemController, 'showToOwner'])
    router.get('/', [ItemController, 'index'])
    router.put('/:itemId', [ItemController, 'update'])
    router.delete('/:itemId', [ItemController, 'delete'])
})
    .prefix('client/:clientId/item')
    .middleware(middleware.clientIsHimself())
