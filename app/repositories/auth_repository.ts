import User from "#models/user";
import { AccessToken } from "@adonisjs/auth/access_tokens";

export default class AuthRepository {
    public async verifyCredentials(email: string, password: string): Promise<User> {
        return await User.verifyCredentials(email, password)
    }

    public async createToken(user: User): Promise<AccessToken> {
        return await User.accessTokens.create(user)
    }
}