import { inject } from '@adonisjs/core';
import ClientRepository from "../../repositories/client/client_repository.js";
import AuthRepository from '../../repositories/general/auth_repository.js';
import { UpdateAddressDto } from '../../dtos/client/address_dto.js';

@inject()
export default class UpdateClientUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly authRepository: AuthRepository
    ) {}

    public async run(clientId: string, addressDto: UpdateAddressDto, email?: string, password?: string, name?: string): Promise<void>{
        const client = await this.clientRepository.show(clientId)
        await this.clientRepository.update(client, addressDto, email, password, name)
        if(password !== undefined) {
            this.authRepository.deleteTokens(client.userId)
        }
    }
}