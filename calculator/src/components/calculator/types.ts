type calculatorState = {
  isLoadingZip: boolean;
  currentTab: string;
  zip: string;
  downPayment: string;
  creditScore: string;
  creditScoreValue: string;
  term: string;
  tradeInValue: string;
  mileage: string;
  apr: string;
  autoData: autoData;
  taxes: string;
  monthlyPaymentLoan: number;
  monthlyPaymentLease: number;
  isTradeInError: boolean;
  isDownPaymentError: boolean;
};

type autoData = {
  vehicleName: string;
  msrp: number;
  dealerName: string;
  dealerPhoneNumber: string;
  dealerRating: number;
}

type ipService = {
  getZip: getZip;
}

type getZip = {
  (): Promise<string>;
}

export {
  calculatorState, ipService,
};
