import React from 'react';
import InfoCard from '../info-card';
import IpService from '../../services/ip';
import Loan from '../loan';
import Lease from '../lease';
import TabSwitcher from '../tab-switcher/tab-switcher';
import getData from '../../services/data-mock';
import './calculator.css';
import { trim, trimWithSign } from '../../utils/utils';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.IpService = new IpService();
    this.state = {
      isLoadingZip: true,
      currentTab: 'loan',

      zip: '',
      downPayment: '',
      creditScore: '750',
      creditScoreValue: '0.95',
      term: '24',
      tradeInValue: '',
      mileage: '12000',
      apr: '',

      autoData: {},

      taxes: '',
      monthlyPaymentLoan: 0,
      monthlyPaymentLease: 0,

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
      this.setState({ ...JSON.parse(storage), isLoadingZip: false });
    } else {
      const zip = await this.IpService.getZip();
      const autoData = await getData();
      this.setState({
        zip, autoData, isLoadingZip: false,
      });
    }
  }

  async componentDidUpdate(_, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      const { isTradeInError, isDownPaymentError } = this.state;
      this.updateTaxes();

      if (!isTradeInError && !isDownPaymentError) {
        this.updateMonthlyPaymentLoan();
        this.updateMonthlyPaymentLease();
      }

      sessionStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  zipChange(e) {
    const zip = trim(e.target.value);
    this.setState({ zip });
  }

  tradeInChange(e) {
    const { autoData: { msrp } } = this.state;
    const tradeInValue = trimWithSign(e.target.value);

    if (Number(tradeInValue) > msrp / 4) {
      this.setState({ tradeInValue, isTradeInError: true });
    } else {
      this.setState({ tradeInValue, isTradeInError: false });
    }
  }

  downPaymentsChange(e) {
    const { autoData: { msrp } } = this.state;
    const downPayment = trimWithSign(e.target.value);

    if (Number(downPayment) > msrp / 4) {
      this.setState({ downPayment, isDownPaymentError: true });
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
    const apr = trimWithSign(e.target.value);
    this.setState({ apr });
  }

  mileageChange(e) {
    const mileage = e.target.value;
    this.setState({ mileage });
  }

  updateTaxes() {
    const { zip } = this.state;
    const taxes = zip
      .split('')
      .map((el) => `${+el * 11}%`)
      .join(', ');

    this.setState({ taxes });
  }

  calculateMonthlyPaymentLoan() {
    const {
      tradeInValue, downPayment, apr, creditScoreValue, term,
    } = this.state;
    const { autoData } = this.state;
    const { msrp } = autoData;

    const monthlyPaymentLoan = Math.round(
      ((+msrp - +tradeInValue - +downPayment) / +term) * +creditScoreValue * +apr,
    );

    return new Promise((resolve) => {
      setInterval(resolve(monthlyPaymentLoan), 500);
    });
  }

  calculateMonthlyPaymentLease() {
    const {
      tradeInValue, downPayment, mileage, creditScoreValue, term,
    } = this.state;
    const { autoData } = this.state;
    const { msrp } = autoData;

    const monthlyPaymentLease = Math.round(
      (msrp - +tradeInValue - +downPayment)
      * (+mileage / 10000 / +term) * +creditScoreValue,
    );

    return new Promise((resolve) => {
      resolve(monthlyPaymentLease);
    });
  }

  async updateMonthlyPaymentLease() {
    const monthlyPaymentLease = await Promise
      .resolve(this.calculateMonthlyPaymentLease())
      .then((res) => res);

    this.setState({ monthlyPaymentLease });
  }

  async updateMonthlyPaymentLoan() {
    const monthlyPaymentLoan = await Promise
      .resolve(this.calculateMonthlyPaymentLoan())
      .then((res) => res);

    this.setState({ monthlyPaymentLoan });
  }

  switchTab(tabName) {
    this.setState({ currentTab: tabName });
  }

  render() {
    const {
      zip, tradeInValue, downPayment, creditScore, term, autoData,
      monthlyPaymentLoan, taxes, mileage, currentTab, apr, monthlyPaymentLease,
      isLoadingZip, isDownPaymentError, isTradeInError,
    } = this.state;

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
        isTradeInError={isTradeInError}
        isDownPaymentError={isDownPaymentError}
        isLoadingZip={isLoadingZip}
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
          isTradeInError={isTradeInError}
          isDownPaymentError={isDownPaymentError}
        />
      );

    const monthlyPayment = currentTab === 'loan'
      ? monthlyPaymentLoan
      : monthlyPaymentLease;

    return (
      <div className="container-sm mt-5 d-flex justify-content-between flex-wrap w-100">
        <div className="d-flex flex-column left">
          <TabSwitcher currentTab={currentTab} onTabClick={this.switchTab} />
          {tab}
        </div>
        <div className="border border-secondary rounded mt-5 mb-5 p-4 d-flex flex-column right">
          <InfoCard monthlyPayment={monthlyPayment} taxes={taxes} autoData={autoData} />
        </div>
      </div>
    );
  }
}

export default Calculator;
