import Client from "#models/client";
import User from "#models/user";
import db from "@adonisjs/lucid/services/db";
import { Roles } from "../../utils/enums.js";
import { CreateAddressDto, CreateGeolocationDto, UpdateAddressDto, UpdateGeolocationDto } from "../../dtos/client/address_dto.js";
import { UpdateClientDto } from "../../dtos/client/client_dto.js";

export default class ClientRepository {
    public async create(email: string, password: string, name: string, role: Roles, isVerified: boolean): Promise<Client> {
        return await db.transaction(async (trx) => {
            const user = await User.create({ email, password, role }, { client: trx })
            const client = await Client.create({ userId: user.id, name, isVerified }, { client: trx })
            await client.load('user' as any)
            return client
        })
    }

    public async show(clientId: string): Promise<Client> {
        //todo não era pra ser necessário essa conversão, procurar o motivo em algum momento
        return await Client.query()
            .where('id', clientId)
            .preload('user' as any)
            .preload('address' as any)
            .firstOrFail()
    }

    public async index(page: number, perPage: number, search: string): Promise<Client[]> {
        return await Client.query()
            .whereILike('name', `%${search}%`)
            .preload('user' as any)
            .paginate(page, perPage)
    }

    public async update(
        client: Client,
        { email, password, ...clientDto }: UpdateClientDto,
        addressDto: UpdateAddressDto,
        geolocationDto: UpdateGeolocationDto
    ): Promise<void> {
        await db.transaction(async (trx) => {
            client.user.useTransaction(trx)
            await client.user.merge({ email, password }).save()

            client.useTransaction(trx)
            await client.merge(clientDto).save()

            if (client.address !== null) {
                client.address.useTransaction(trx)
                await client.address.merge(addressDto).save()
                const geolocation = await client.address.related('geolocation').query().firstOrFail()
                geolocation.useTransaction(trx)
                await geolocation.merge(geolocationDto).save()
            }
        })
    }

    public async createAddress(client: Client, addressDto: CreateAddressDto, geolocationDto: CreateGeolocationDto): Promise<void> {
        await db.transaction(async (trx) => {
            const address = await client.related('address' as any).create(addressDto, { client: trx })
            await address.related('geolocation' as any).create(geolocationDto, { client: trx })
        })
    }

    public async delete(client: Client): Promise<void> {
        await client.user.delete()
    }
}