import { useState, useEffect } from 'react';
import classes from './EmiPlans.module.css';
import shared from '../../styles.module.css';
import EmiList from './EmiList/EmiList';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { calculateEmi } from './../../utils/helper';

function EmiPlans(props) {
  const [regularEmiPlan, setRegularEmiPlan] = useState([]);
  const [prepaymentEmiPlan, setPrepaymentEmiPlan] = useState([]);
  const [monthlyPrepaymentAmount, setMonthlyPrepaymentAmount] = useState(1000);

  useEffect(() => {
    const {
      interestRate,
      numberOfYears,
      loanAmount,
      emiStartMonth,
      emisStartYear,
    } = props.emiParams;

    setRegularEmiPlan(
      calculateEmi({
        interestRate,
        numberOfMonths: numberOfYears * 12,
        loanAmount,
        emiStartMonth,
        emisStartYear,
        prepaymentEnabled: false,
      })
    );
    setPrepaymentEmiPlan(
      calculateEmi({
        interestRate,
        numberOfMonths: numberOfYears * 12,
        loanAmount,
        emiStartMonth,
        emisStartYear,
        prepaymentEnabled: true,
        monthlyPrepaymentAmount,
      })
    );
  }, [props.emiParams]);

  return (
    <section
      className={`${classes.emi_summary_container} ${shared.flex_h} ${shared.justify_center}`}
    >
      <div className={`${classes.regular_emi}`}>
        <EmiList emiSummary={regularEmiPlan} />
      </div>
      <Card>
        <CardActions>
          <div>
            <div className={`${shared.flex_h}`}>
              <FormControl variant="standard" sx={{ width: '10ch' }}>
                <Input
                  id="standard-adornment-weight"
                  value={monthlyPrepaymentAmount}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  onChange={(event) => {
                    setMonthlyPrepaymentAmount(Number(event.target.value));
                    setPrepaymentEmiPlan(
                      calculateEmi({
                        interestRate: props.emiParams.interestRate,
                        numberOfMonths: props.emiParams.numberOfYears * 12,
                        loanAmount: props.emiParams.loanAmount,
                        emiStartMonth: props.emiParams.emiStartMonth,
                        emisStartYear: props.emiParams.emisStartYear,
                        prepaymentEnabled: true,
                        monthlyPrepaymentAmount: Number(event.target.value),
                      })
                    );
                  }}
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
              <Typography variant="body2">
                additional monthly payment
              </Typography>
            </div>
          </div>
        </CardActions>
        <CardContent>
          <EmiList emiSummary={prepaymentEmiPlan} />
        </CardContent>
      </Card>
    </section>
  );
}

export default EmiPlans;
