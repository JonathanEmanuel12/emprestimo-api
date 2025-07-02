import vine from '@vinejs/vine'

export const signInValidator = vine.compile(
    vine.object({
        email: vine.string().trim(),
        password: vine.string()
    })
)

export const codeValidator = vine.compile(
    vine.object({
        code: vine.string().trim()
    })
)
