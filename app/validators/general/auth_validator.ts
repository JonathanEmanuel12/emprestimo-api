import vine from '@vinejs/vine'

export const signInValidator = vine.compile(
    vine.object({
        email: vine.string().trim(),
        password: vine.string()
    })
)
