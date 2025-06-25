import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
    vine.object({
        email: vine.string().trim().unique({ table: 'users', column: 'email' }),
        password: vine.string(),
        name: vine.string()
    })
)

export const updateClientValidator = vine.compile(
    vine.object({
        email: vine.string().trim().unique({ table: 'users', column: 'email' }).optional(),
        password: vine.string().optional(),
        name: vine.string().optional()
    })
)
