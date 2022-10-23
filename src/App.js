import { useState } from 'react';
import classes from './App.module.css';
import shared from './styles.module.css';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import EmiList from './components/EmiList';
import { calculateEmi } from './utils/helper';

function App() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, seInterestRate] = useState(0);
  const [numberOfYears, setNumberOfYears] = useState(0);
  const [emiStartdate, setEmiStartdate] = useState(dayjs(new Date()));
  const [emiSummary, setEmiSummary] = useState([]);

  const calculateEmiHandler = () => {
    setEmiSummary(
      calculateEmi({
        interestRate,
        numberOfMonths: numberOfYears * 12,
        loanAmount,
        emiStartMonth: emiStartdate.$M,
        emisStartYear: emiStartdate.$y,
      })
    );
    const totalInterest = emiSummary.reduce((acc, curr) => {
      return acc + curr.interestComponent;
    }, 0);
    const totalExpense = loanAmount + totalInterest;
  };

  const visibilityHandler = (year, visibility) => {
    setEmiSummary((prevEmiSummary) => {
      return prevEmiSummary.map((elem) => {
        return {
          ...elem,
          detailedView: elem.year === year ? visibility : elem.detailedView,
        };
      });
    });
  };

  return (
    <div>
      <section className={classes.inputs_container}>
        <div
          className={`${shared.flex_h} ${shared.justify_center} ${shared.align_basline}`}
        >
          <TextField
            label="Loan Amount"
            type="number"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            onChange={(event) => setLoanAmount(event.target.value)}
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
            onChange={(event) => seInterestRate(Number(event.target.value))}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
          <TextField
            label="Loan Tenure"
            type="number"
            id="outlined-end-adornment"
            sx={{ m: 1, width: '25ch' }}
            onChange={(event) => setNumberOfYears(Number(event.target.value))}
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
              value={emiStartdate}
              onChange={(value) => setEmiStartdate(value)}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className={`${shared.flex_h} ${shared.justify_center}`}>
          <Button variant="contained" onClick={calculateEmiHandler}>
            Calculate
          </Button>
        </div>
      </section>
      <section className={`${classes.emi_summary_container} ${shared.flex_h}`}>
        <EmiList emiSummary={emiSummary} onSetVisibility={visibilityHandler} />
      </section>
    </div>
  );
}

export default App;
