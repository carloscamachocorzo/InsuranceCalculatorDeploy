export interface CurrentConditionsDTO {
  bank: string;
  creditBalance: number;
  creditNumber: string;
  currentInstallment: number;
  pendingInstallments: number;
  interestRate: number;
  insurance: number;
  remainingYears: number;
  subsidy: number;
}

export interface NewAlternativeDTO {
  proyectionNumber: number;
  termYears: string;
  additionalPaymentWithoutInsurance: number;
  additionalPaymentWithInsurance: number;
  installmentWithoutInsurance: number;
  totalApproximatePayment: number;
  capitalPayment: number;
  interestPayment: number;
}

export interface SavingsDto {
  proyectionNumber: number;
  interestSavings: number;
  insuranceSavings: number;
  totalSavings: number;
  reducedInstallments: number;
  savingsYears: string;
}

export interface FeesDto {
  proyectionNumber: number;
  value: number;
}

export interface FinancialStudyDto {
    nameClient: string;
    mailClient: string;
    currentConditionsDTO: CurrentConditionsDTO;
    listNewAlternatives: NewAlternativeDTO[];
    listSavings: SavingsDto[];
    interestRate: number;
    listFeesDto: FeesDto[];
    financialAdvisor: string;
    noteLaw: string;
    noteDuration: string;
}
