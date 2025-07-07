import Item from "#models/item";
import db from "@adonisjs/lucid/services/db";
import { ItemIndexDto } from "../../dtos/client/item_dto.js";

export default class ItemRepository {
    public async create(name: string, description: string, clientId: string, observation?: string): Promise<Item> {
        return await Item.create({ name, description, observation, clientId })
    }

    public async show(itemId: string): Promise<Item> {
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

    public async update(item: Item, name?: string, description?: string, observation?: string): Promise<void> {
        await item.merge({ name, description, observation }).save()
    }

    public async delete(item: Item): Promise<void> {
        await item.delete()
    }
}