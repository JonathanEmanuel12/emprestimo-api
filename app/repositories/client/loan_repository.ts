import Loan from "#models/loan";
import { DateTime } from "luxon";
import { LoanStatus } from "../../utils/enums.js";
import { UpdateLoanDto } from "../../dtos/client/loan_dto.js";

export default class LoanRepository {
    public async create(clientId: string, itemId: string, status: LoanStatus): Promise<Loan> {
        return await Loan.create({ clientId, itemId, status })
    }

    public async get(loanId: string): Promise<Loan> {
        return await Loan.query().where('id', loanId).firstOrFail()
    }
    
    public async update(loan: Loan, loanDto: UpdateLoanDto): Promise<void> {
        await loan.merge(loanDto).save()
    }

    public async getOverdueByClient(clientId: string): Promise<Loan | null> {
        return await Loan.query()
            .where('clientId', clientId)
            .andWhere('status', LoanStatus.LENT)
            .andWhere('returnDeadline', '<', DateTime.now().toFormat('yyyy-MM-dd'))
            .first()
    }

    public async getNotReturnedByItem(itemId: string): Promise<Loan | null> {
        return await Loan.query()
            .where('itemId', itemId)
            .andWhereNot('status', LoanStatus.RETURNED)
            .first()
    }
}