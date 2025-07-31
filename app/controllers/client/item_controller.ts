import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
//todo usar # nos imports
import { paginationValidator, searchValidator } from '#validators/general/index_validator';
import ItemRepository from '#repositories/client/item_repository';
import UpdateItemUseCase from '#use_cases/client/item/update_item_use_case';
import DeleteItemUseCase from '#use_cases/client/item/delete_item_use_case';
import { createItemValidator, geolocationFilterValidator, indexItemValidator, updateItemValidator } from '#validators/client/item_validator';

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

    public async show({ params, request, response }: HttpContext) {
        const { clientId, itemId } = params
        const { latitude, longitude } = await request.validateUsing(geolocationFilterValidator)
        const item = await this.itemRepository.show(itemId, latitude, longitude, clientId)
        return response.ok(item)
    }

    public async showToOwner({ params, response }: HttpContext) {
        const { itemId } = params
        const item = await this.itemRepository.get(itemId)
        return response.ok(item)
    }

    public async index({ params, request, response }: HttpContext) {
        const { clientId } = params

        const { page = 1, perPage = 10 } = await request.validateUsing(paginationValidator)
        const { search = '' } = await request.validateUsing(searchValidator)
        const { showMyItems = false, distance } = await request.validateUsing(indexItemValidator)
        const { latitude, longitude } = await request.validateUsing(geolocationFilterValidator)

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