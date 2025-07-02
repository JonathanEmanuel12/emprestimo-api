import { inject } from '@adonisjs/core';
import AuthRepository from "../../repositories/general/auth_repository.js";
import ClientRepository from "../../repositories/client/client_repository.js";
import { Roles } from '../../utils/enums.js';
import EmailService from '#services/email_service';
import generateRandomString from '../../utils/functions/generateRandomString.js';

@inject()
export default class SignUpUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly clientRepository: ClientRepository,
        private readonly emailService: EmailService
    ) {}

    public async run(email: string, password: string, name: string): Promise<{ id: string }>{
        const client = await this.clientRepository.create(email, password, name, Roles.CLIENT, false)
        const validationCode = await this.authRepository.createValidationCode(client, generateRandomString())
        await this.emailService.sendNewClientEmail(client, validationCode.code)
        return { id: client.id }
    }
}