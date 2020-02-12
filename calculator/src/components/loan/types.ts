type loanProps = {
  zip: string;
  tradeInValue: string;
  downPayment: string;
  creditScore: string;
  apr: string;
  term: string;
  onZipChange: onChange;
  onAprChange: onChange;
  onTradeInChange: onChange;
  onTermChange: onChange;
  onDownPaymentChange: onChange;
  onCreditScoreChange: onChange;
  isTradeInError: boolean;
  isDownPaymentError: boolean;
  isLoadingZip: boolean;
};

type onChange = {
  (val: string): void;
}

export default loanProps;
