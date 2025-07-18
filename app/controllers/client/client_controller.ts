import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
//todo usar # nos imports
import ClientRepository from '#repositories/client/client_repository';
import { paginationValidator, searchValidator } from '#validators/general/index_validator';
import { completeProfileValidator, updateClientValidator } from '#validators/client/client_validator';
import UpdateClientUseCase from '#use_cases/client/update_client_use_case';
import DeleteClientUseCase from '#use_cases/client/delete_client_use_case';
import { createAddressValidator, createGeolocationValidator, updateAddressValidator, updateGeolocationValidator } from '#validators/client/address_validator';
import CompleteProfileUseCase from '#use_cases/client/complete_profile_use_case';

@inject()
export default class ClientController {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly completeProfileUseCase: CompleteProfileUseCase,
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
    
    public async completeProfile({ params, request, response }: HttpContext) {
        const { clientId } = params
        const addressDto = await request.validateUsing(createAddressValidator)
        const geolocationDto = await request.validateUsing(createGeolocationValidator)
        const { img } = await request.validateUsing(completeProfileValidator)
        await this.completeProfileUseCase.run(clientId, addressDto, geolocationDto, img)
        return response.noContent()
    }
    
    public async update({ params, request, response }: HttpContext) {
        const { clientId } = params
        const { img, ...clientDto } = await request.validateUsing(updateClientValidator)
        const addressDto = await request.validateUsing(updateAddressValidator)
        const geolocationDto = await request.validateUsing(updateGeolocationValidator)
        await this.updateClientUseCase.run(clientId, clientDto, addressDto, geolocationDto, img)
        return response.noContent()
    }

    public async delete({ params, response }: HttpContext) {
        const { clientId } = params
        await this.deleteClientUseCase.run(clientId)
        return response.noContent()
    }
}