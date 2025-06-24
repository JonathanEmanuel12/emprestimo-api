import Client from "#models/client";
import User from "#models/user";
import db from "@adonisjs/lucid/services/db";
import { Roles } from "../utils/enums.js";

export default class ClientRepository {
    public async create(email: string, password: string, name: string, role: Roles): Promise<Client> {
        return await db.transaction(async (trx) => {
            const user = await User.create({ email, password, role }, { client: trx })
            const client = await Client.create({ userId: user.id, name }, { client: trx })
            await client.load('user' as any)
            return client
        })
    }
}