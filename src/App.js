import { useState } from 'react';
import classes from './App.module.css';
import shared from './Styles.module.css';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function App() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, seInterestRate] = useState(0);
  const [numberOfYears, setNumberOfYears] = useState(0);
  const [date, setDate] = useState(dayjs(new Date()));
  const [emiSummary, setEmiSummary] = useState([]);

  const loanAmountChangeHandler = (event) => {
    setLoanAmount(Number(event.target.value));
  };
  const interestRateChangeHandler = (event) => {
    seInterestRate(Number(event.target.value));
  };
  const numberOfYearsChangeHandler = (event) => {
    setNumberOfYears(Number(event.target.value));
  };
  const dateChangeHandler = (date) => {
    setDate(date);
  };

  /*
  emi = P * r * ((1+r)^n / ((1+r)^n -1))
  where, 
  P -> Principal Loan Amount
  r -> Monthy interest rate
  n -> Number of period in months
  */
  const calculateEmiHandler = () => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfMonths = numberOfYears * 12;
    const rate = Math.pow(1 + monthlyInterestRate, numberOfMonths);

    const emi = loanAmount * monthlyInterestRate * (rate / (rate - 1));

    let loanRemaining = loanAmount;
    const emiDetails = Array(numberOfMonths)
      .fill({})
      .map(() => {
        const interestComponent = monthlyInterestRate * loanRemaining;
        const pricipalComponent = emi - interestComponent;
        loanRemaining = loanRemaining - pricipalComponent;

        return {
          emi: Math.round(emi),
          pricipalComponent: Math.round(pricipalComponent),
          interestComponent: Math.round(interestComponent),
          loanRemaining: Math.round(loanRemaining),
        };
      });
    setEmiSummary(emiDetails);
    const totalInterest = emiSummary.reduce((acc, curr) => {
      return acc + curr.interestComponent;
    }, 0);
    const totalExpense = loanAmount + totalInterest;
    console.log(date);
  };

  return (
    <div>
      <section className={classes['inputs-container']}>
        <div
          className={`${shared['flex-h']} ${shared['justify-center']} ${shared['align-basline']}`}
        >
          <TextField
            label="Loan Amount"
            type="number"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            onChange={loanAmountChangeHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Interest rate"
            type="number"
            id="outlined-end-adornment"
            sx={{ m: 1, width: '25ch' }}
            onChange={interestRateChangeHandler}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
          <TextField
            label="Loan Tenure"
            type="number"
            id="outlined-end-adornment"
            sx={{ m: 1, width: '25ch' }}
            onChange={numberOfYearsChangeHandler}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Years</InputAdornment>
              ),
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={['year', 'month']}
              label="EMI starts on"
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className={`${shared['flex-h']} ${shared['justify-center']}`}>
          <Button variant="contained" onClick={calculateEmiHandler}>
            Calculate
          </Button>
        </div>
      </section>
      <section className={classes['emi-summary-container']}>
        {emiSummary.map((data, index) => {
          return (
            <Accordion key={data.loanRemaining} defaultExpanded={index === 0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Loan Remaining: {data.loanRemaining}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography> Emi: {data.emi} </Typography>
                <Typography> Principal: {data.pricipalComponent} </Typography>
                <Typography> Interest: {data.interestComponent} </Typography>
                <Typography> Loan Remaining: {data.loanRemaining} </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </section>
    </div>
  );
}

export default App;
