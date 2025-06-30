import { inject } from '@adonisjs/core';
import ClientRepository from "../../repositories/client/client_repository.js";
import { CreateAddressDto } from '../../dtos/client/address_dto.js';

@inject()
export default class CompleteProfileUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) { }

    public async run(clientId: string, addressDto: CreateAddressDto): Promise<void> {
        const client = await this.clientRepository.show(clientId)
        await this.clientRepository.createAddress(client, addressDto)
    }
}