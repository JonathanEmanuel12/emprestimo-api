import Item from "#models/item";

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

    public async index(page: number, perPage: number, search: string, showMyItems: boolean, clientId: string): Promise<Item[]> {
        const itemQuery = Item.query()
            .whereILike('name', `%${search}%`)
            .preload('client')
        
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