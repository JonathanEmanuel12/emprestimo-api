import { inject } from '@adonisjs/core';
import ApplicationException from '#exceptions/application_exception';
import LoanRepository from '../../../repositories/client/loan_repository.js';
import { UpdateLoanDto } from '../../../dtos/client/loan_dto.js';
import { LoanStatus } from '../../../utils/enums.js';
import Loan from '#models/loan';
import { DateTime } from 'luxon';

@inject()
export default class UpdateLoanUseCase {
    constructor(
        private readonly loanRepository: LoanRepository
    ) {}

    public async run(loanId: string, clientId: string, loanDto: UpdateLoanDto): Promise<void>{
        const loan = await this.loanRepository.get(loanId)
        this.checkClient(clientId, loan)
        this.checkStatusRules(loan, loanDto)
        this.checkLoanDateAndDeadline(loanDto.loanDate, loanDto.returnDeadline)
        await this.loanRepository.update(loan, loanDto)
    }

    private checkClient(clientId: string, loan: Loan): void {
        if(loan.item.clientId !== clientId) {
            throw new ApplicationException('Acesso negado!', { status: 403 })
        }
    }

    private checkLoanDateAndDeadline(loanDate?: DateTime, returnDeadline?: DateTime): void {
        if(returnDeadline !== undefined && loanDate !== undefined && loanDate > returnDeadline) {
            throw new ApplicationException('A data do empréstimo deve ser menor que a data limite de retorno', { status: 400 })
        }
    }

    private checkStatusRules(loan: Loan, { loanDate, returnDeadline, status }: UpdateLoanDto): void {
        if(loan.status !== LoanStatus.REQUESTED && (status === LoanStatus.ACCEPT || status === LoanStatus.CANCELED)) {
            throw new ApplicationException('O status do empréstimo não permite essa ação', { status: 400 })
        }

        if(loan.status !== LoanStatus.ACCEPT && status === LoanStatus.LENT) {
            throw new ApplicationException('O status do empréstimo não permite essa ação', { status: 400 })
        }

        if(loan.status !== LoanStatus.LENT && status === LoanStatus.RETURNED) {
            throw new ApplicationException('O status do empréstimo não permite essa ação', { status: 400 })
        }

        if(loan.status !== LoanStatus.REQUESTED && (returnDeadline !== undefined || loanDate !== undefined)) {
            throw new ApplicationException('O status do empréstimo não permite essa ação', { status: 400 })
        }
    }
}