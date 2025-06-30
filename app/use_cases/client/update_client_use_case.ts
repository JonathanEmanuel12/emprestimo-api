import { inject } from '@adonisjs/core';
import ClientRepository from "../../repositories/client/client_repository.js";
import AuthRepository from '../../repositories/general/auth_repository.js';
import { UpdateAddressDto } from '../../dtos/client/address_dto.js';
import { UpdateClientDto } from '../../dtos/client/client_dto.js';

@inject()
export default class UpdateClientUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly authRepository: AuthRepository
    ) {}

    public async run(clientId: string, clientDto: UpdateClientDto, addressDto: UpdateAddressDto): Promise<void>{
        const client = await this.clientRepository.show(clientId)
        await this.clientRepository.update(client, clientDto, addressDto)
        if(clientDto.password !== undefined) {
            this.authRepository.deleteTokens(client.userId)
        }
    }
}