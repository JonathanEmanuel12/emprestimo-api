import { SearchDto } from "../index_dto.js"

export interface ItemIndexDto extends SearchDto{ 
    showMyItems: boolean
    clientId: string
    latitude: string
    longitude: string
    distance: number
}