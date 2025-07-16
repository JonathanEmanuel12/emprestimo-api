import { inject } from '@adonisjs/core';
import ClientRepository from "#repositories/client/client_repository";
import { CreateAddressDto, CreateGeolocationDto } from '../../dtos/client/address_dto.js';
import { MultipartFile } from '@adonisjs/core/bodyparser';
import FileService from '#services/file_service';

@inject()
export default class CompleteProfileUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly fileService: FileService
    ) { }

    public async run(clientId: string, addressDto: CreateAddressDto, geolocationDto: CreateGeolocationDto, img: MultipartFile): Promise<void> {
        const client = await this.clientRepository.show(clientId)
        const imgUrl = await this.fileService.upload(img, 'client/profile_img', client.id)
        await this.clientRepository.createAddress(client, addressDto, geolocationDto)
        await this.clientRepository.update(client, { imgUrl }, {}, {})
    }
}