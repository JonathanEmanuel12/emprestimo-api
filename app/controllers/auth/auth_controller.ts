import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
//todo usar # nos imports
import SignInUseCase from '../../use_cases/auth/sign_in_use_case.js';
import { signInValidator } from '#validators/auth_validator';
import SignUpUseCase from '../../use_cases/auth/sign_up_use_case.js';
import { createClientValidator } from '#validators/client_validator';

@inject()
export default class AuthController {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase
    ) { }

    public async signUp({ request, response }: HttpContext) {
        const { email, password, name } = await request.validateUsing(createClientValidator)
        const token = await this.signUpUseCase.run(email, password, name)
        return response.ok(token)
    }
    
    public async signIn({ request, response }: HttpContext) {
        const { email, password } = await request.validateUsing(signInValidator)
        const token = await this.signInUseCase.run(email, password)
        return response.ok(token)
    }
}