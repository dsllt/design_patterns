import {
  CarLoan,
  MortgageLoan,
} from '../../../../src/gof/creational/abstract_factory/Loan'

test('Deve criar um financiamento imobiliário', function () {
  const loan = MortgageLoan.create(100000, 10000, 240)
  expect(loan.loanId).toBeDefined()
  expect(loan.amount).toBe(100000)
  expect(loan.income).toBe(10000)
  expect(loan.installments).toBe(240)
})

test('Não deve criar um financiamento imobiliário com prazo superior a 420 meses', function () {
  expect(() => MortgageLoan.create(100000, 10000, 450)).toThrow(
    new Error('The maximum number of installments for mortgage loans is 420')
  )
})

test('Não deve criar um financiamento imobiliário caso a parcela ocupe um valor superior a 25% da renda mensal', function () {
  expect(() => MortgageLoan.create(200000, 1000, 420)).toThrow(
    new Error('The installment amount cannot exceed 25% of the income amount')
  )
})

test('Não deve criar um financiamento veicular com prazo superior a 60 meses', function () {
  expect(() => CarLoan.create(100000, 10000, 72)).toThrow(
    new Error('The maximum number of installments for car loans is 60')
  )
})

test('Não deve criar um financiamento imobiliário caso a parcela ocupe um valor superior a 30% da renda mensal', function () {
  expect(() => CarLoan.create(200000, 1000, 60)).toThrow(
    new Error('The installment amount cannot exceed 30% of the income amount')
  )
})
