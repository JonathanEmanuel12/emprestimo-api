import { inject } from '@adonisjs/core';
import AuthRepository from "../repositories/auth_repository.js";
import UserRepository from "../repositories/user_repository.js";
import { Roles } from "../utils/enums.js";

@inject()
export default class SignInUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userRepository: UserRepository
    ) {}

    public async run(email: string, password: string): Promise<{ token?: string, type: string, id?: string }>{
        const user = await this.authRepository.verifyCredentials(email, password)
        const userWithRoles = await this.userRepository.getWithRoles(user.id)
        const fullToken = await this.authRepository.createToken(user)
        const { token, type } = fullToken.toJSON()
        return { token, type, id: (user.role === Roles.ADMIN) ? undefined : userWithRoles[user.role].id}
    }
}