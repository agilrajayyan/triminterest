/*
  emi = P * r * ((1+r)^n / ((1+r)^n -1))
  where, 
  P -> Principal Loan Amount
  r -> Monthy interest rate
  n -> Number of period in months
*/
export const getPrePaymentEmiPlan = (inputs) => {
  const {
    interestRate,
    numberOfMonths,
    loanAmount,
    emiStartDate,
    emiHikeRate,
    yearlyPrepaymentAmount,
  } = inputs;

  console.log(yearlyPrepaymentAmount);
  const monthlyInterestRate = interestRate / 12 / 100;
  const rate = Math.pow(1 + monthlyInterestRate, numberOfMonths);
  const baseEmi = loanAmount * monthlyInterestRate * (rate / (rate - 1));
  let emi = baseEmi;

  let loanRemaining = loanAmount;
  let payments = [];
  for (let index = 0; index < numberOfMonths; index++) {
    //Increasing the EMI by the user given rate starting off from second year
    if (index !== 0 && index % 12 === 0) {
      emi += emi * (emiHikeRate / 100);
    }

    const interestComponent = monthlyInterestRate * loanRemaining;
    const isLastEmi = loanRemaining + interestComponent <= emi;
    const pricipalComponent = isLastEmi
      ? loanRemaining
      : emi - interestComponent;
    loanRemaining = isLastEmi ? 0 : loanRemaining - pricipalComponent;

    payments.push({
      installmentNumber: index,
      paymentDate: getNthPaymentDate(emiStartDate, index),
      emi: Math.round(pricipalComponent + interestComponent),
      pricipalComponent: Math.round(pricipalComponent),
      interestComponent: Math.round(interestComponent),
      loanRemaining: Math.round(loanRemaining),
    });
  }
  payments = payments.filter((payment) => payment.emi > 0);

  return {
    payments,
    numberOfInstallments: payments.length,
    totalInterest: payments.reduce(
      (acc, curr) => acc + curr.interestComponent,
      0
    ),
  };
};

/*
  emi = P * r * ((1+r)^n / ((1+r)^n -1))
  where, 
  P -> Principal Loan Amount
  r -> Monthy interest rate
  n -> Number of period in months
*/
export const getRegularEmiPlan = (inputs) => {
  const { interestRate, numberOfMonths, loanAmount, emiStartDate } = inputs;
  const monthlyInterestRate = interestRate / 12 / 100;
  const rate = Math.pow(1 + monthlyInterestRate, numberOfMonths);
  const emi = loanAmount * monthlyInterestRate * (rate / (rate - 1));

  let loanRemaining = loanAmount;
  let payments = [];
  for (let index = 0; index < numberOfMonths; index++) {
    const interestComponent = monthlyInterestRate * loanRemaining;
    const isLastEmi = loanRemaining + interestComponent <= emi;
    const pricipalComponent = isLastEmi
      ? loanRemaining
      : emi - interestComponent;
    loanRemaining = isLastEmi ? 0 : loanRemaining - pricipalComponent;

    payments.push({
      date: getNthPaymentDate(emiStartDate, index),
      installmentNumber: index,
      paymentDate: getNthPaymentDate(emiStartDate, index),
      emi: Math.round(pricipalComponent + interestComponent),
      pricipalComponent: Math.round(pricipalComponent),
      interestComponent: Math.round(interestComponent),
      loanRemaining: Math.round(loanRemaining),
    });
  }
  payments = payments.filter((payment) => payment.emi > 0);

  return {
    payments,
    numberOfInstallments: payments.length,
    totalInterest: payments.reduce(
      (acc, curr) => acc + curr.interestComponent,
      0
    ),
  };
};

export const groupPaymentsByYear = (payments) => {
  const years = payments.map((payment) => payment.paymentDate.getFullYear());
  const uniqueYears = Array.from(new Set(years));
  return uniqueYears.map((year) => {
    return {
      year,
      payments: payments.filter(
        (payment) => payment.paymentDate.getFullYear() === year
      ),
    };
  });
};

export const getMonthByIndex = (monthIndex) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months.at(monthIndex);
};

export const getNthPaymentDate = (startDate, installmentNumber) => {
  const paymentDate = new Date(startDate);
  paymentDate.setMonth(startDate.getMonth() + installmentNumber);
  return paymentDate;
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-IN').format(number);
};
