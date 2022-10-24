import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import classes from './EmiParameters.module.css';
import shared from '../../styles.module.css';
import Button from '@mui/material/Button';

function EmiParameters(props) {
  const [loanAmount, setLoanAmount] = useState(240000);
  const [interestRate, seInterestRate] = useState(11.88);
  const [numberOfYears, setNumberOfYears] = useState(2);
  const [emiStartdate, setEmiStartdate] = useState(dayjs(new Date()));

  return (
    <section className={classes.inputs_container}>
      <div
        className={`${shared.flex_h} ${shared.justify_center} ${shared.align_basline} ${shared.margin_bottom_2}`}
      >
        <TextField
          label="Loan Amount"
          type="number"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="standard"
          value={loanAmount}
          onChange={(event) => setLoanAmount(event.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          label="Interest rate"
          type="number"
          id="outlined-end-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="standard"
          value={interestRate}
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
          variant="standard"
          value={numberOfYears}
          onChange={(event) => setNumberOfYears(Number(event.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">Years</InputAdornment>,
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year', 'month']}
            label="EMI starts on"
            variant="standard"
            value={emiStartdate}
            onChange={(value) => setEmiStartdate(value)}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
      </div>
      <div className={`${shared.flex_h} ${shared.justify_center}`}>
        <Button
          variant="contained"
          onClick={() => {
            props.onChangeEmiParams({
              loanAmount,
              interestRate,
              numberOfYears,
              emiStartMonth: emiStartdate.$M,
              emisStartYear: emiStartdate.$y,
            });
          }}
        >
          Calculate
        </Button>
      </div>
    </section>
  );
}

export default EmiParameters;
