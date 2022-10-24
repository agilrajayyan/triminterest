/*
  emi = P * r * ((1+r)^n / ((1+r)^n -1))
  where, 
  P -> Principal Loan Amount
  r -> Monthy interest rate
  n -> Number of period in months
*/
export const calculateEmi = (inputs) => {
  const {
    interestRate,
    numberOfMonths,
    loanAmount,
    emiStartMonth,
    emisStartYear,
    prepaymentEnabled,
    monthlyPrepaymentAmount,
  } = inputs;

  const monthlyInterestRate = interestRate / 12 / 100;
  const rate = Math.pow(1 + monthlyInterestRate, numberOfMonths);

  const emi = loanAmount * monthlyInterestRate * (rate / (rate - 1));

  const paymentDates = getMonthsWithYear(
    emiStartMonth,
    emisStartYear,
    numberOfMonths
  );

  let loanRemaining = loanAmount;
  let payments = [];
  for (let index = 0; index < numberOfMonths; index++) {
    const interestComponent = monthlyInterestRate * loanRemaining;
    const isLastEmi = loanRemaining + interestComponent <= emi;
    const pricipalComponent = isLastEmi
      ? loanRemaining
      : emi - interestComponent;
    loanRemaining = isLastEmi ? 0 : loanRemaining - pricipalComponent;
    if (prepaymentEnabled && !isLastEmi) {
      loanRemaining = loanRemaining - monthlyPrepaymentAmount;
    }
    payments.push({
      installmentNumber: index,
      paymentDate: paymentDates.at(index),
      emi: Math.round(pricipalComponent + interestComponent),
      pricipalComponent: Math.round(pricipalComponent),
      interestComponent: Math.round(interestComponent),
      loanRemaining: Math.round(loanRemaining),
    });
  }
  payments = payments.filter((payment) => payment.emi > 0);
  const totalInterest = payments.reduce((acc, curr) => {
    return acc + curr.interestComponent;
  }, 0);
  const years = payments.map((payment) => payment.paymentDate.year);
  const uniqueYears = Array.from(new Set(years));
  const yearlyBasisPayments = uniqueYears.map((year, index) => {
    return {
      year,
      payments: payments.filter((payment) => payment.paymentDate.year === year),
    };
  });
  return yearlyBasisPayments;
};

const getMonthsWithYear = (startMonth, startYear, numberOfMonths) => {
  let month = startMonth;
  let year = startYear;
  let monthsWithYears = [];
  for (let counter = 0; counter <= numberOfMonths; counter++) {
    monthsWithYears.push({ month, year });
    if (month === 11) {
      month = 0;
      year++;
    } else {
      month++;
    }
  }
  return monthsWithYears;
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
