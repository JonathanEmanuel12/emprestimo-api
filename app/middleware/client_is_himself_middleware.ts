import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ClientIsHimselfMiddleware {
  async handle({ auth, params, response }: HttpContext, next: NextFn) {
    const { clientId } = params
    const user = await auth.authenticate()

    await user.load('client')
    if(user.client.id !== clientId) {
        return response.forbidden({ message: 'Accesso negado' })
    }
    
    const output = await next()
    return output
  }
}