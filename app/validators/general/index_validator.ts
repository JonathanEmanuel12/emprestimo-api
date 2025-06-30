import vine from '@vinejs/vine'

export const paginationValidator = vine.compile(
    vine.object({
        page: vine.number().optional(),
        perPage: vine.number().optional()
    })
)

export const searchValidator = vine.compile(
    vine.object({
        search: vine.string().optional()
    })
)
