const autoData = {
  vehicleName: 'Chevrolet New Yorker 1970',
  msrp: 100000,
  dealerName: 'CHEVROLET OF JERSEY CITY',
  dealerPhoneNumber: '(201) 433-9500',
  dealerRating: 4.8,
};

const getData = (): Promise<object> => new Promise((resolve) => resolve(autoData));

export default getData;
