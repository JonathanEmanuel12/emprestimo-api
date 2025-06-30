import { DateTime } from "luxon";
import { LoanStatus } from "../../utils/enums.js";

export interface UpdateLoanDto {
    status?: LoanStatus.CANCELED | LoanStatus.ACCEPT | LoanStatus.LENT | LoanStatus.RETURNED
    loanDate?: DateTime
    returnDeadline?: DateTime
}