import vine from '@vinejs/vine'

export const createItemValidator = vine.compile(
    vine.object({
        name: vine.string().trim(),
        description: vine.string(),
        observation: vine.string().optional()
    })
)

export const updateItemValidator = vine.compile(
    vine.object({
        name: vine.string().trim().optional(),
        description: vine.string().optional(),
        observation: vine.string().optional()
    })
)

export const indexItemValidator = vine.compile(
    vine.object({
        showMyItems: vine.boolean().optional()
    })
)
