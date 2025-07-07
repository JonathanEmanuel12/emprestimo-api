export interface PaginateDto {
    page: number
    perPage: number
}

export interface SearchDto extends PaginateDto {
    search: string
}
