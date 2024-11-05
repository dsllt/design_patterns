import Loan from './Loan'

export default interface LoanRepository {
  save(loan: Loan): Promise<void>
  getById(loanId: string): Promise<Loan>
}

export class LoanRepositoryMemory implements LoanRepository {
  loans: Loan[]
  static instance: LoanRepository

  private constructor() {
    this.loans = []
  }

  async save(loan: Loan): Promise<void> {
    this.loans.push(loan)
  }

  async getById(loanId: string): Promise<Loan> {
    const loan = await this.loans.find((loan) => loan.loanId === loanId)
    if (!loan) throw new Error('Could not find loan')
    return loan
  }

  static getInstance() {
    if (!LoanRepositoryMemory.instance) {
      LoanRepositoryMemory.instance = new LoanRepositoryMemory()
    }
    return LoanRepositoryMemory.instance
  }
}
