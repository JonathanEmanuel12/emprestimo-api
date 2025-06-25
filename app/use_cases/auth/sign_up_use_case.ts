import { inject } from '@adonisjs/core';
import AuthRepository from "../../repositories/general/auth_repository.js";
import ClientRepository from "../../repositories/client/client_repository.js";
import { Roles } from '../../utils/enums.js';

@inject()
export default class SignUpUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly clientRepository: ClientRepository
    ) {}

    public async run(email: string, password: string, name: string): Promise<{ token?: string, type: string, id?: string }>{
        const client = await this.clientRepository.create(email, password, name, Roles.CLIENT)
        const fullToken = await this.authRepository.createToken(client.user)
        const { token, type } = fullToken.toJSON()
        return { token, type, id: client.id }
    }
}