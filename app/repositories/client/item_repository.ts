import Item from "#models/item";
import db from "@adonisjs/lucid/services/db";
import { ItemIndexDto } from "../../dtos/client/item_dto.js";
import { LoanStatus } from "../../utils/enums.js";

export default class ItemRepository {
    public async create(name: string, description: string, clientId: string, observation?: string): Promise<Item> {
        return await Item.create({ name, description, observation, clientId })
    }

    public async show(itemId: string, latitude: string, longitude: string, clientId: string): Promise<Item> {
        return await Item.query()
            .select('id', 'name', 'description', 'observation', 'clientId')
            .where('id', itemId)
            .preload('client', (query) => {
                query.select('id', 'name', 'imgUrl')
                query.preload('address' as any, (query) => {
                    query.preload('geolocation', (query: any) => {
                        query.select(db.raw(`geolocations.id, geolocations.address_id, (6371 * acos(cos(radians(cast(geolocations.latitude as double precision)))
                            * cos(radians('${latitude}'))
                            * cos(radians(cast(geolocations.longitude as double precision))
                            - radians('${longitude}'))
                            + sin(radians(cast(geolocations.latitude as double precision)))
                            * sin(radians('${latitude}')))) as distance`))
                    })
                })
            })
            .preload('loans', (query) => {
                query.where('clientId', clientId)
                query.andWhereNotIn('status', [LoanStatus.CANCELED, LoanStatus.RETURNED])
            })
            .firstOrFail()
    }

    public async get(itemId: string): Promise<Item> {
        return await Item.query()
            .where('id', itemId)
            .preload('client')
            .firstOrFail()
    }

    public async index(itemIndexDto: ItemIndexDto): Promise<Item[]> {
        const { page, perPage, search, latitude, longitude, distance, showMyItems, clientId } = itemIndexDto

        const itemQuery = Item.query()
            .preload('client', (query) => {
                query.select('id', 'name', 'userId', 'imgUrl')
                query.preload('address' as any, (query) => {
                    query.select('id', 'state', 'city', 'clientId')
                    query.preload('geolocation', (query: any) => {
                        query.select(db.raw(`geolocations.id, geolocations.address_id, (6371 * acos(cos(radians(cast(geolocations.latitude as double precision)))
                            * cos(radians('${latitude}'))
                            * cos(radians(cast(geolocations.longitude as double precision))
                            - radians('${longitude}'))
                            + sin(radians(cast(geolocations.latitude as double precision)))
                            * sin(radians('${latitude}')))) as distance`))
                    })
                })
            })
            .whereILike('name', `%${search}%`)
            .andWhereHas('client', (query) => {
                query.whereHas('address' as any, (query) => {
                    query.whereHas('geolocation', (query: any) => {
                        query.whereRaw(`
                            (select (6371 * acos(cos(radians(cast(geolocations.latitude as double precision)))
                            * cos(radians('${latitude}'))
                            * cos(radians(cast(geolocations.longitude as double precision))
                            - radians('${longitude}'))
                            + sin(radians(cast(geolocations.latitude as double precision)))
                            * sin(radians('${latitude}'))))) < ?
                        `, [distance])
                    })
                })
            })
        
            
        if(showMyItems === true) {
            itemQuery.andWhere('clientId', clientId)
        }
        else {
            itemQuery.andWhereNot('clientId', clientId)
        }
        
        return await itemQuery.paginate(page, perPage)
    }

    public async update(item: Item, updateItemDto: { name?: string, description?: string, observation?: string, imgUrl?: string }): Promise<void> {
        await item.merge(updateItemDto).save()
    }

    public async delete(item: Item): Promise<void> {
        await item.delete()
    }
}