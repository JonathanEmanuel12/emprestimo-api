import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { LoanStatus } from '../../utils/enums.js'

export const requestLoanValidator = vine.compile(
    vine.object({
        itemId: vine.string()
    })
)

export const updateLoanValidator = vine.compile(
    vine.object({
        status: vine.enum([LoanStatus.CANCELED, LoanStatus.ACCEPT, LoanStatus.LENT, LoanStatus.RETURNED]).optional(),
        returnDeadline: vine.date({ formats: 'YYYY-MM-DD' }).transform((date) => DateTime.fromJSDate(date)).optional(),
        loanDate: vine.date({ formats: 'YYYY-MM-DD' }).transform((date) => DateTime.fromJSDate(date)).optional()
    })
)