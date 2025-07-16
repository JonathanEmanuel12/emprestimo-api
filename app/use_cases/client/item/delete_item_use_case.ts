import { inject } from '@adonisjs/core';
import ItemRepository from '#repositories/client/item_repository';
import ApplicationException from '#exceptions/application_exception';

@inject()
export default class DeleteItemUseCase {
    constructor(
        private readonly itemRepository: ItemRepository
    ) {}

    public async run(itemId: string, clientId: string): Promise<void>{
        const item = await this.itemRepository.show(itemId)
        if(item.clientId !== clientId) {
            throw new ApplicationException('Acesso negado!', { status: 403 })
        }

        await this.itemRepository.delete(item)
    }
}