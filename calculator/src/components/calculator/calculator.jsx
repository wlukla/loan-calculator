import React from 'react';
import InfoCard from '../info-card';
import IpService from '../../services/ip';
import Loan from '../loan/loan';
import Lease from '../lease';
import TabSwitcher from '../tab-switcher/tab-switcher';
import getData from '../../services/data-mock';
import Spinner from '../../spinner';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.IpService = new IpService();
    this.state = {
      isLoading: true,
      currentTab: 'loan',
      zip: '',
      downPayment: '',
      creditScore: '750',
      creditScoreValue: '0.95',
      term: '24',
      tradeInValue: '',
      apr: '',
      mileage: '12000',
      monthlyPaymentLoan: '0',
      monthlyPaymentLease: '0',
      taxes: '',
      termOptions: [12, 24, 36, 48, 60, 72],
      creditScoreOptions: [600, 650, 700, 750, 800, 850, 900],
      mileageOptions: [10000, 12000, 15000],
      autoData: {},
      isTradeInError: false,
      isDownPaymentError: false,
    };

    this.zipChange = this.zipChange.bind(this);
    this.tradeInChange = this.tradeInChange.bind(this);
    this.downPaymentsChange = this.downPaymentsChange.bind(this);
    this.creditScoreChange = this.creditScoreChange.bind(this);
    this.termChange = this.termChange.bind(this);
    this.aprChange = this.aprChange.bind(this);
    this.mileageChange = this.mileageChange.bind(this);
    this.switchTab = this.switchTab.bind(this);
  }

  async componentDidMount() {
    const storage = sessionStorage.getItem('state');
    if (storage) {
      this.setState(JSON.parse(storage));
    } else {
      const zip = await this.IpService.getZip();
      const autoData = await getData();
      this.setState({
        zip, autoData, isLoading: false,
      });
    }
  }

  async componentDidUpdate(_, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.calculateTaxes();
      Promise.resolve(this.calculateMonthlyPaymentLoan());
      Promise.resolve(this.calculateMonthlyPaymentLease());
      sessionStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  zipChange(e) {
    const zip = e.target.value;
    this.setState({ zip });
  }

  tradeInChange(e) {
    const { autoData: { msrp } } = this.state;
    const tradeInValue = e.target.value.slice(2).replace(/_/g, '');
    if (Number(tradeInValue) > msrp / 4) {
      this.setState({ tradeInValue, isTradeInError: true });
    } else {
      this.setState({ tradeInValue, isTradeInError: false });
    }
  }

  downPaymentsChange(e) {
    const { autoData: { msrp } } = this.state;
    const downPayment = e.target.value.slice(2).replace(/_/g, '');
    if (Number(downPayment) > msrp / 4) {
      this.setState({ isDownPaymentError: true });
    } else {
      this.setState({ downPayment, isDownPaymentError: false });
    }
  }

  creditScoreChange(e) {
    const creditScore = e.target.value;
    let { creditScoreValue } = this.state;
    if (creditScore >= 750) {
      creditScoreValue = 0.95;
    } else if (creditScore >= 700 && creditScore < 750) {
      creditScoreValue = 1;
    } else if (creditScore >= 640 && creditScore < 700) {
      creditScoreValue = 1.05;
    } else {
      creditScoreValue = 1.2;
    }

    this.setState({ creditScore, creditScoreValue });
  }

  termChange(e) {
    const term = e.target.value;
    this.setState({ term });
  }

  aprChange(e) {
    const apr = e.target.value.slice(2).replace(/_/g, '');
    this.setState({ apr });
  }

  mileageChange(e) {
    const mileage = e.target.value;
    this.setState({ mileage });
  }

  calculateTaxes() {
    const { zip } = this.state;
    const taxes = zip.split('').map((el) => `${+el * 11}%`).join(', ');
    this.setState({ taxes });
  }

  calculateMonthlyPaymentLoan() {
    let {
      tradeInValue, downPayment, apr, creditScoreValue, term,
    } = this.state;
    const { autoData } = this.state;
    const { msrp } = autoData;
    creditScoreValue = Number(creditScoreValue);
    tradeInValue = Number(tradeInValue);
    term = Number(term);
    downPayment = Number(downPayment);
    apr = Number(apr);

    const monthlyPaymentLoan = String(
      ((msrp - tradeInValue - downPayment) / term) * creditScoreValue * apr,
    );

    this.setState({ monthlyPaymentLoan, isLoading: false });
  }

  calculateMonthlyPaymentLease() {
    this.setState({ isLoading: true });
    let {
      tradeInValue, downPayment, mileage, creditScoreValue, term,
    } = this.state;
    const { autoData } = this.state;
    const { msrp } = autoData;
    tradeInValue = Number(tradeInValue);
    creditScoreValue = Number(creditScoreValue);
    term = Number(term);
    downPayment = Number(downPayment.slice(2));
    mileage = Number(mileage);

    const monthlyPaymentLease = String(
      (msrp - tradeInValue - downPayment)
      * (mileage / 1000 / term) * creditScoreValue,
    );

    this.setState({ monthlyPaymentLease, isLoading: false });
  }

  switchTab(tabName) {
    this.setState({ currentTab: tabName });
  }

  render() {
    const {
      zip, tradeInValue, downPayment, creditScore, term, autoData,
      monthlyPaymentLoan, taxes, termOptions, creditScoreOptions,
      mileageOptions, mileage, currentTab, apr, monthlyPaymentLease, isLoading,
      isDownPaymentError, isTradeInError,
    } = this.state;

    if (isLoading) {
      return (
        <Spinner />
      );
    }

    const tab = currentTab === 'loan' ? (
      <Loan
        zip={zip}
        tradeInValue={tradeInValue}
        downPayment={downPayment}
        creditScore={creditScore}
        term={term}
        apr={apr}
        onZipChange={this.zipChange}
        onTradeInChange={this.tradeInChange}
        onDownPaymentChange={this.downPaymentsChange}
        onCreditScoreChange={this.creditScoreChange}
        onTermChange={this.termChange}
        onAprChange={this.aprChange}
        termOptions={termOptions}
        creditScoreOptions={creditScoreOptions}
        isTradeInError={isTradeInError}
        isDownPaymentError={isDownPaymentError}
      />
    )
      : (
        <Lease
          zip={zip}
          tradeInValue={tradeInValue}
          downPayment={downPayment}
          creditScore={creditScore}
          term={term}
          mileage={mileage}
          onZipChange={this.zipChange}
          onTradeInChange={this.tradeInChange}
          onDownPaymentChange={this.downPaymentsChange}
          onCreditScoreChange={this.creditScoreChange}
          onTermChange={this.termChange}
          onMileageChange={this.mileageChange}
          termOptions={termOptions}
          creditScoreOptions={creditScoreOptions}
          mileageOptions={mileageOptions}
          isTradeInError={isTradeInError}
          isDownPaymentError={isDownPaymentError}
        />
      );

    const monthlyPayment = currentTab === 'loan'
      ? monthlyPaymentLoan
      : monthlyPaymentLease;

    return (
      <div className="container-sm mt-5 d-flex justify-content-between">
        <div className="d-flex flex-column w-100">
          <TabSwitcher currentTab={currentTab} onTabClick={this.switchTab} />
          {tab}
        </div>
        <InfoCard monthlyPayment={monthlyPayment} taxes={taxes} autoData={autoData} />
      </div>
    );
  }
}

export default Calculator;
