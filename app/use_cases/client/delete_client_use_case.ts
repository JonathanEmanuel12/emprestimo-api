import { inject } from '@adonisjs/core';
import ClientRepository from "../../repositories/client_repository.js";

@inject()
export default class DeleteClientUseCase {
    constructor(
        private readonly clientRepository: ClientRepository
    ) {}

    public async run(clientId: string): Promise<void>{
        const client = await this.clientRepository.show(clientId)
        await this.clientRepository.delete(client)
    }
}