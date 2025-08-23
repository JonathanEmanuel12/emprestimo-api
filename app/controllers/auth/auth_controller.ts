import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
//todo usar # nos imports
import SignInUseCase from '#use_cases/auth/sign_in_use_case';
import { codeValidator, signInValidator } from '#validators/general/auth_validator';
import SignUpUseCase from '#use_cases/auth/sign_up_use_case';
import { createClientValidator } from '#validators/client/client_validator';
import ValidateSignUpCodeUseCase from '#use_cases/auth/validate_sign_up_code_use_case';

@inject()
export default class AuthController {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase,
        private readonly validateSignUpCodeUseCase: ValidateSignUpCodeUseCase
    ) { }

    public async signUp({ request, response }: HttpContext) {
        const { email, password, name } = await request.validateUsing(createClientValidator)
        const client = await this.signUpUseCase.run(email, password, name)
        return response.ok(client)
    }

    public async verify({ params, request, response }: HttpContext) {
        const { clientId } = params
        const { code } = await request.validateUsing(codeValidator)
        const token = await this.validateSignUpCodeUseCase.run(clientId, code)
        return response.ok(token)
    }
    
    public async signIn({ request, response }: HttpContext) {
        const { email, password } = await request.validateUsing(signInValidator)
        const token = await this.signInUseCase.run(email, password)
        return response.ok(token)
    }
}