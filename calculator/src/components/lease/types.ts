type leaseProps = {
  zip: string;
  tradeInValue: string;
  downPayment: string;
  creditScore: string;
  term: string;
  mileage: string;
  isTradeInError: boolean;
  isDownPaymentError: boolean;
  onZipChange: onChange;
  onMileageChange: onChange;
  onTradeInChange: onChange;
  onTermChange: onChange;
  onDownPaymentChange: onChange;
  onCreditScoreChange: onChange;
}

type onChange = {
  (val: string): void;
}

export default leaseProps;
