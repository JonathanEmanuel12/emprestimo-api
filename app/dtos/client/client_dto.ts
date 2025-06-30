export interface CreateClientDto {
    cep: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement?: string        
}

export interface UpdateClientDto extends CreateClientDto { }