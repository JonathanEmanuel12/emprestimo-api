export interface CreateAddressDto {
    cep: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement?: string        
}

export interface UpdateAddressDto extends Partial<CreateAddressDto> { }

export interface CreateGeolocationDto {
    latitude: string
    longitude: string
}

export interface UpdateGeolocationDto {
    latitude?: string
    longitude?: string
}