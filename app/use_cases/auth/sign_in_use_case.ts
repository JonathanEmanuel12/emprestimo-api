import { inject } from '@adonisjs/core';
import AuthRepository from "#repositories/general/auth_repository";
import UserRepository from "#repositories/general/user_repository";
import { Roles } from "../../utils/enums.js";
import ApplicationException from '#exceptions/application_exception';
import User from '#models/user';

@inject()
export default class SignInUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userRepository: UserRepository
    ) {}

    public async run(email: string, password: string): Promise<{ token?: string, type: string, id?: string }>{
        const user = await this.authRepository.verifyCredentials(email, password)
        const userWithRoles = await this.userRepository.getWithRoles(user.id)
        await this.checkIfClient(userWithRoles)
        const fullToken = await this.authRepository.createToken(user)
        const { token, type } = fullToken.toJSON()
        return { token, type, id: (user.role === Roles.ADMIN) ? undefined : userWithRoles[user.role].id}
    }

    private async checkIfClient(userWithRole: User): Promise<void> {
        if(userWithRole.client?.isVerified === false) {
            throw new ApplicationException('Cliente não verificado', { status: 401 });
        }
    }
}