import User from "#models/user";
import { AccessToken } from "@adonisjs/auth/access_tokens";
import db from "@adonisjs/lucid/services/db";

export default class AuthRepository {
    public async verifyCredentials(email: string, password: string): Promise<User> {
        return await User.verifyCredentials(email, password)
    }

    public async createToken(user: User): Promise<AccessToken> {
        return await User.accessTokens.create(user)
    }

    public async deleteTokens(userId: string): Promise<void> {
        await db.from("auth_access_tokens").where("tokenable_id", userId).delete()
    }
}