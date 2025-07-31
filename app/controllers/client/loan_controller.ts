import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
//todo usar # nos imports
import { updateLoanValidator, requestLoanValidator } from '#validators/client/loan_validator';
import RequestLoanUseCase from '#use_cases/client/loan/request_loan_use_case';
import UpdateLoanUseCase from '#use_cases/client/loan/update_loan_use_case';
import { paginationValidator, searchValidator } from '#validators/general/index_validator';
import LoanRepository from '#repositories/client/loan_repository';

@inject()
export default class LoanController {
    constructor(
        private readonly requestLoanUseCase: RequestLoanUseCase,
        private readonly updateLoanUseCase: UpdateLoanUseCase,
        private readonly loanRepository: LoanRepository
    ) { }

    public async request({ params, request, response }: HttpContext) {
        const { clientId } = params
        const { itemId } = await request.validateUsing(requestLoanValidator)
        const loan = await this.requestLoanUseCase.run(clientId, itemId)
        return response.created(loan)
    }

    public async update({ params, request, response }: HttpContext) {
        const { clientId, loanId } = params
        const loanDto = await request.validateUsing(updateLoanValidator)
        await this.updateLoanUseCase.run(loanId, clientId, loanDto)
        return response.noContent()
    }

    public async index({ params, request, response }: HttpContext) {
        const { clientId } = params
        const { page = 1, perPage = 10 } = await request.validateUsing(paginationValidator)
        const { search = '' } = await request.validateUsing(searchValidator)
        const loans = await this.loanRepository.index(search, page, perPage, clientId)
        return response.ok(loans)
    }
}