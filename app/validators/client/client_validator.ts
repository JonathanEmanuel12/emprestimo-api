import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
    vine.object({
        email: vine.string().trim().unique({ table: 'users', column: 'email' }),
        password: vine.string(),
        name: vine.string()
    })
)

export const completeProfileValidator = vine.compile(
    vine.object({
        img: vine.file({ extnames: ['png', 'jpg'] })
    })
);

export const updateClientValidator = vine.compile(
    vine.object({
        email: vine.string().trim().unique({ table: 'users', column: 'email' }).optional(),
        img: vine.file({ extnames: ['png', 'jpg'] }).optional(),
        password: vine.string().optional(),
        name: vine.string().optional()
    })
)
