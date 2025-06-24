import User from "#models/user";

export default class UserRepository {
    public async getWithRoles(userId: string): Promise<User> {
        return await User.query().where('id', userId).preload('client').firstOrFail()
    }
}