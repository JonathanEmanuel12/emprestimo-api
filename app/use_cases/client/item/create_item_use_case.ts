import { inject } from '@adonisjs/core';
import ItemRepository from '#repositories/client/item_repository';
import { MultipartFile } from '@adonisjs/core/types/bodyparser';
import FileService from '#services/file_service';
import Item from '#models/item';

@inject()
export default class CreateItemUseCase {
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly fileService: FileService
    ) { }

    public async run(name: string, description: string, clientId: string, img: MultipartFile, observation?: string): Promise<Item> {
        const item = await this.itemRepository.create(name, description, clientId, observation)
        const imgUrl = await this.fileService.upload(img, `items`, `${item.id}.${img.extname ?? 'jpg'}`)
        await this.itemRepository.update(item, { imgUrl })
        return item
    }
}