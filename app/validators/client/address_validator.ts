import vine from '@vinejs/vine'

export const createAddressValidator = vine.compile(
    vine.object({
        cep: vine.string(),
        state: vine.string(),
        city: vine.string(),
        neighborhood: vine.string(),
        street: vine.string(),
        number: vine.string(),
        complement: vine.string().optional()
    })
)

export const updateAddressValidator = vine.compile(
    vine.object({
        cep: vine.string().optional(),
        state: vine.string().optional(),
        city: vine.string().optional(),
        neighborhood: vine.string().optional(),
        street: vine.string().optional(),
        number: vine.string().optional(),
        complement: vine.string().optional()
    })
)
