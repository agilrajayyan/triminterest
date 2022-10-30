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
import {
  getPrePaymentEmiPlan,
  getRegularEmiPlan,
  groupPaymentsByYear,
} from './../../utils/helper';

function EmiPlans(props) {
  const [regularEmiPlan, setRegularEmiPlan] = useState({});
  const [prepaymentEmiPlan, setPrepaymentEmiPlan] = useState({});
  const [emiHikeRate, setemiHikeRate] = useState(5);
  const [yearlyPrepaymentAmount, setYearlyPrepaymentAmount] = useState(10000);

  const setEmiPlan = (isPrePaymentPlan, payload) => {
    const plan = isPrePaymentPlan
      ? getPrePaymentEmiPlan(payload)
      : getRegularEmiPlan(payload);
    const emiPlan = {
      totalInterest: plan.totalInterest,
      payments: groupPaymentsByYear(plan.payments),
    };
    isPrePaymentPlan
      ? setPrepaymentEmiPlan(emiPlan)
      : setRegularEmiPlan(emiPlan);
  };

  useEffect(() => {
    const { interestRate, numberOfYears, loanAmount, emiStartDate } =
      props.emiParams;

    setEmiPlan(false, {
      interestRate,
      numberOfMonths: numberOfYears * 12,
      loanAmount,
      emiStartDate,
    });

    setEmiPlan(true, {
      interestRate,
      numberOfMonths: numberOfYears * 12,
      loanAmount,
      emiStartDate,
      emiHikeRate,
      yearlyPrepaymentAmount,
    });
  }, [props.emiParams]);

  return (
    <section
      className={`${classes.emi_summary_container} ${shared.flex_h} ${shared.justify_center}`}
    >
      <div className={`${classes.regular_emi}`}>
        <EmiList emiPlan={regularEmiPlan} />
      </div>
      <Card>
        <CardActions>
          <div>
            <div className={`${shared.flex_h}`}>
              <FormControl variant="standard" sx={{ width: '10ch' }}>
                <Input
                  id="standard-adornment-weight"
                  value={emiHikeRate}
                  endAdornment={
                    <InputAdornment position="start">%</InputAdornment>
                  }
                  onChange={(event) => {
                    setemiHikeRate(Number(event.target.value));
                    setEmiPlan(true, {
                      interestRate: props.emiParams.interestRate,
                      numberOfMonths: props.emiParams.numberOfYears * 12,
                      loanAmount: props.emiParams.loanAmount,
                      emiStartDate: props.emiParams.emiStartDate,
                      emiHikeRate: Number(event.target.value),
                      yearlyPrepaymentAmount,
                    });
                  }}
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
              <Typography variant="body2">
                increase in EMI every year
              </Typography>
            </div>
            <div className={`${shared.flex_h}`}>
              <FormControl variant="standard" sx={{ width: '10ch' }}>
                <Input
                  id="standard-adornment-weight"
                  value={yearlyPrepaymentAmount}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  onChange={(event) => {
                    setYearlyPrepaymentAmount(Number(event.target.value));
                    setEmiPlan(true, {
                      interestRate: props.emiParams.interestRate,
                      numberOfMonths: props.emiParams.numberOfYears * 12,
                      loanAmount: props.emiParams.loanAmount,
                      emiStartDate: props.emiParams.emiStartDate,
                      emiHikeRate: Number(event.target.value),
                      yearlyPrepaymentAmount: Number(event.target.value),
                    });
                  }}
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
              <Typography variant="body2">
                additional payment every year
              </Typography>
            </div>
          </div>
        </CardActions>
        <CardContent>
          <EmiList emiPlan={prepaymentEmiPlan} />
        </CardContent>
      </Card>
    </section>
  );
}

export default EmiPlans;
