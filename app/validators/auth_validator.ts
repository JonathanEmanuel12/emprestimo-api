import vine from '@vinejs/vine'

export const signInValidator = vine.compile(
    vine.object({
        email: vine.string().trim().exists({ table: 'users', column: 'email' }),
        password: vine.string()
    })
)

export const signUpValidator = vine.compile(
    vine.object({
        email: vine.string().trim().unique({ table: 'users', column: 'email' }),
        password: vine.string(),
        name: vine.string()
    })
)
