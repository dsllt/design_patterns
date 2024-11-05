import crypto from 'crypto'

export default abstract class Loan {
  abstract rate: number

  constructor(
    readonly loanId: string,
    readonly amount: number,
    readonly income: number,
    readonly installments: number,
    readonly type: string
  ) {}

  static create(amount: number, income: number, installments: number) {
    throw new Error('This method is abstract')
  }
}

export class MortgageLoan extends Loan {
  rate = 10

  constructor(
    loanId: string,
    amount: number,
    income: number,
    installments: number
  ) {
    super(loanId, amount, income, installments, 'mortgage')
    if (installments > 420)
      throw new Error(
        'The maximum number of installments for mortgage loans is 420'
      )

    if (income * 0.25 < amount / installments)
      throw new Error(
        'The installment amount cannot exceed 25% of the income amount'
      )
  }

  static create(amount: number, income: number, installments: number) {
    const loanId = crypto.randomUUID()
    return new MortgageLoan(loanId, amount, income, installments)
  }
}

export class CarLoan extends Loan {
  rate = 15

  constructor(
    loanId: string,
    amount: number,
    income: number,
    installments: number
  ) {
    super(loanId, amount, income, installments, 'car')
    if (installments > 60)
      throw new Error('The maximum number of installments for car loans is 60')

    if (income * 0.3 < amount / installments)
      throw new Error(
        'The installment amount cannot exceed 30% of the income amount'
      )
  }

  static create(amount: number, income: number, installments: number) {
    const loanId = crypto.randomUUID()
    return new CarLoan(loanId, amount, income, installments)
  }
}
