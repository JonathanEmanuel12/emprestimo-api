import { inject } from '@adonisjs/core';
import ApplicationException from '#exceptions/application_exception';
import LoanRepository from '../../../repositories/client/loan_repository.js';
import { LoanStatus } from '../../../utils/enums.js';
import Loan from '#models/loan';

@inject()
export default class RequestLoanUseCase {
    constructor(
        private readonly loanRepository: LoanRepository
    ) { }

    public async run(clientId: string, itemId: string): Promise<Loan> {
        await this.checkOverdueOfClient(clientId)
        await this.checkItemAvailability(itemId)
        return await this.loanRepository.create(clientId, itemId, LoanStatus.REQUESTED)
    }

    private async checkOverdueOfClient(clientId: string): Promise<void> {
        const overdueLoan = await this.loanRepository.getOverdueByClient(clientId)
        if(overdueLoan !== null) {
            throw new ApplicationException('Você não pode solicitar um empréstimo enquanto possui outro atrasado', { status: 403 })
        }
    }

    private async checkItemAvailability(itemId: string): Promise<void> {
        const notAvailableItem = await this.loanRepository.getNotReturnedByItem(itemId)
        if(notAvailableItem !== null) {
            throw new ApplicationException('Item não disponível para empréstimo', { status: 403 })
        }
    }
}