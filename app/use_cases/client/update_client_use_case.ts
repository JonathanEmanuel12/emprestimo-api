import { inject } from '@adonisjs/core';
import ClientRepository from "#repositories/client/client_repository";
import AuthRepository from '#repositories/general/auth_repository';
import { UpdateAddressDto, UpdateGeolocationDto } from '../../dtos/client/address_dto.js';
import { UpdateClientDto } from '../../dtos/client/client_dto.js';
import { MultipartFile } from '@adonisjs/core/bodyparser';
import FileService from '#services/file_service';

@inject()
export default class UpdateClientUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly authRepository: AuthRepository,
        private readonly fileService: FileService,
    ) {}

    public async run(clientId: string, clientDto: UpdateClientDto, addressDto: UpdateAddressDto, geolocationDto: UpdateGeolocationDto, img?: MultipartFile): Promise<void>{
        const client = await this.clientRepository.show(clientId)
        let imgUrl: string | undefined = undefined
        if(img !== undefined) {
            imgUrl = await this.fileService.upload(img, 'client/profile_img', client.id)
        }

        await this.clientRepository.update(client, { imgUrl, ...clientDto }, addressDto, geolocationDto)
        if(clientDto.password !== undefined) {
            this.authRepository.deleteTokens(client.userId)
        }
    }
}