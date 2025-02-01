export interface BankConditionsRequest {
  nameClient: string;
  financialAdvisor: string;
  bankName: string;
  creditNumber: string;
  balance: number;
  pendingInstallments: number;
  monthlyInstallment: number;
  currentInsuranceCost: number;
  capitalPayment: number;
  interestPayment: number;
  canceledInstallments: number;
  interestRate: number;
  PercentageFees: number;
  subsidy: number;
  listProjectionperiod: number[];
}
