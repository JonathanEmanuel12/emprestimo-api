import { inject } from '@adonisjs/core';
import ClientRepository from "../../repositories/client_repository.js";
import AuthRepository from '../../repositories/auth_repository.js';

@inject()
export default class UpdateClientUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly authRepository: AuthRepository
    ) {}

    public async run(clientId: string, email?: string, password?: string, name?: string): Promise<void>{
        const client = await this.clientRepository.show(clientId)
        await this.clientRepository.update(client, email, password, name)
        if(password !== undefined) {
            this.authRepository.deleteTokens(client.userId)
        }
    }
}