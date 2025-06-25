import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
//todo usar # nos imports
import ClientRepository from '../../repositories/client/client_repository.js';
import { paginationValidator, searchValidator } from '#validators/general/index_validator';
import { updateClientValidator } from '#validators/client/client_validator';
import UpdateClientUseCase from '../../use_cases/client/update_client_use_case.js';
import DeleteClientUseCase from '../../use_cases/client/delete_client_use_case.js';

@inject()
export default class ClientController {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly updateClientUseCase: UpdateClientUseCase,
        private readonly deleteClientUseCase: DeleteClientUseCase
    ) { }

    public async show({ params, response }: HttpContext) {
        const { clientId } = params
        const client = await this.clientRepository.show(clientId)
        return response.ok(client)
    }

    public async index({ request, response }: HttpContext) {
        const { page = 1, perPage = 10 } = await request.validateUsing(paginationValidator)
        const { search = '' } = await request.validateUsing(searchValidator)
        const clients = await await this.clientRepository.index(page, perPage, search)
        return response.ok(clients)
    }
    
    public async update({ params, request, response }: HttpContext) {
        const { clientId } = params
        const { email, password, name } = await request.validateUsing(updateClientValidator)
        await this.updateClientUseCase.run(clientId, email, password, name)
        return response.noContent()
    }

    public async delete({ params, response }: HttpContext) {
        const { clientId } = params
        await this.deleteClientUseCase.run(clientId)
        return response.noContent()
    }
}