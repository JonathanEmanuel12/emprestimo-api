export interface CreateClientDto { 
    email: string
    password: string
    name: string
}

export interface UpdateClientDto extends Partial<CreateClientDto> {
    imgUrl?: string
    isVerified?: boolean
}