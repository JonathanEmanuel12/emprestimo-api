import Client from "#models/client";
import User from "#models/user";
import ValidationCode from "#models/validation_code";
import { AccessToken } from "@adonisjs/auth/access_tokens";
import db from "@adonisjs/lucid/services/db";
import { DateTime } from "luxon";

export default class AuthRepository {
    public async verifyCredentials(email: string, password: string): Promise<User> {
        return await User.verifyCredentials(email, password)
    }

    public async createToken(user: User): Promise<AccessToken> {
        return await User.accessTokens.create(user)
    }

    public async createValidationCode(client: Client, code: string): Promise<ValidationCode> {
        return await ValidationCode.create({ code, wasUsed: false, clientId: client.id })
    }

    public async getValidValidationCode(code: string): Promise<ValidationCode> {
        return await ValidationCode.query()
            .where('code', code)
            .andWhere('wasUsed', false)
            .andWhere('createdAt', '>=', DateTime.now().minus({ minutes: 10 }).toSQL())
            .firstOrFail()
    }

    public async updateValidationCode(validationCode: ValidationCode, validationCodeDto: { wasUsed?: boolean }): Promise<void> {
        await validationCode.merge(validationCodeDto).save()
    }

    public async deleteTokens(userId: string): Promise<void> {
        await db.from("auth_access_tokens").where("tokenable_id", userId).delete()
    }
}