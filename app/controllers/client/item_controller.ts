import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
//todo usar # nos imports
import { paginationValidator, searchValidator } from '#validators/general/index_validator';
import ItemRepository from '../../repositories/client/item_repository.js';
import UpdateItemUseCase from '../../use_cases/client/item/update_item_use_case.js';
import DeleteItemUseCase from '../../use_cases/client/item/delete_item_use_case.js';
import { createItemValidator, indexItemValidator, updateItemValidator } from '#validators/client/item_validator';

@inject()
export default class ItemController {
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly updateItemUseCase: UpdateItemUseCase,
        private readonly deleteItemUseCase: DeleteItemUseCase
    ) { }

    public async create({ params, request, response }: HttpContext) {
        const { clientId } = params
        const { name, description, observation } = await request.validateUsing(createItemValidator)
        const item = await this.itemRepository.create(name, description, clientId, observation)
        return response.created(item)
    }

    public async show({ params, response }: HttpContext) {
        const { itemId } = params
        const item = await this.itemRepository.show(itemId)
        return response.ok(item)
    }

    public async index({ params, request, response }: HttpContext) {
        const { clientId } = params

        const { page = 1, perPage = 10 } = await request.validateUsing(paginationValidator)
        const { search = '' } = await request.validateUsing(searchValidator)
        const { showMyItems = false, latitude, longitude, distance } = await request.validateUsing(indexItemValidator)
        const itemIndexDto = { page, perPage, search, showMyItems, clientId, latitude, longitude, distance }
        
        const items = await await this.itemRepository.index(itemIndexDto)
        return response.ok(items)
    }

    public async update({ params, request, response }: HttpContext) {
        const { itemId, clientId } = params
        const { name, description, observation } = await request.validateUsing(updateItemValidator)
        await this.updateItemUseCase.run(itemId, clientId, name, description, observation)
        return response.noContent()
    }

    public async delete({ params, response }: HttpContext) {
        const { itemId, clientId } = params
        await this.deleteItemUseCase.run(itemId, clientId)
        return response.noContent()
    }
}