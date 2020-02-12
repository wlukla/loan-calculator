type autoData = {
  vehicleName: string;
  msrp: number;
  dealerName: string;
  dealerPhoneNumber: string;
  dealerRating: number;
}

type infoCardProps = {
  monthlyPayment: number;
  taxes: string;
  autoData: autoData;
}

export default infoCardProps;
