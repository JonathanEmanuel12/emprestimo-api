import { inject } from '@adonisjs/core';
import AuthRepository from "../../repositories/general/auth_repository.js";
import ClientRepository from "../../repositories/client/client_repository.js";
import ApplicationException from '#exceptions/application_exception';

@inject()
export default class ValidateSignUpCodeUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly clientRepository: ClientRepository,
    ) { }

    public async run(clientId: string, code: string): Promise<{ token?: string, type: string, id?: string }> {
        const client = await this.clientRepository.show(clientId)
        if (client.isVerified === true) {
            throw new ApplicationException('Cliente já verificado', { status: 400 })
        }

        const validationCode = await this.authRepository.getValidValidationCode(code)
        await this.clientRepository.update(client, { isVerified: true }, {}, {})
        const fullToken = await this.authRepository.createToken(client.user)
        const { token, type } = fullToken.toJSON()
        await this.authRepository.updateValidationCode(validationCode, { wasUsed: true })
        return { token, type, id: client.id }
    }
}