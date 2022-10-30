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
  formatNumber,
  getPrePaymentEmiPlan,
  getRegularEmiPlan,
  groupPaymentsByYear,
} from './../../utils/helper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

function EmiPlans(props) {
  const [regularEmiPlan, setRegularEmiPlan] = useState({});
  const [prepaymentEmiPlan, setPrepaymentEmiPlan] = useState({});
  const [emiHikeRate, setemiHikeRate] = useState(5);
  const [yearlyPrepaymentAmount, setYearlyPrepaymentAmount] = useState(1000);
  const [prePaymentPlanBenefits, setPrePaymentPlanBenefits] = useState({});

  const [age, setAge] = useState('year');

  const setEmiPlan = (isPrePaymentPlan, payload) => {
    const plan = isPrePaymentPlan
      ? getPrePaymentEmiPlan(payload)
      : getRegularEmiPlan(payload);
    const emiPlan = {
      numberOfInstallments: plan.numberOfInstallments,
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

  useEffect(() => {
    const numberOfInstallments =
      regularEmiPlan.numberOfInstallments -
      prepaymentEmiPlan.numberOfInstallments;
    const installmentsReducedBy = `${Math.floor(
      numberOfInstallments / 12
    )} years & ${numberOfInstallments % 12} months`;

    setPrePaymentPlanBenefits({
      savedInterest:
        regularEmiPlan.totalInterest - prepaymentEmiPlan.totalInterest,
      installmentsReducedBy,
    });
  }, [regularEmiPlan, prepaymentEmiPlan]);

  return (
    <section
      className={`${classes.emi_summary_container} ${shared.flex_h} ${shared.justify_center}`}
    >
      <div className={`${classes.regular_emi}`}>
        <EmiList emiPlan={regularEmiPlan} />
      </div>
      <Card>
        <CardActions>
          <div className={classes.additional_payments}>
            <section className={classes.benefits_container}>
              <Typography variant="caption">You could save</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {formatNumber(prePaymentPlanBenefits.savedInterest)}
              </Typography>

              <Typography variant="caption">Installments reduced by</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {prePaymentPlanBenefits.installmentsReducedBy}
              </Typography>
            </section>
            <div className={`${shared.flex_h} ${classes.prepayment_condition}`}>
              <Checkbox inputProps={{ 'aria-label': 'controlled' }} />
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
            <div className={`${shared.flex_h} ${classes.prepayment_condition}`}>
              <Checkbox inputProps={{ 'aria-label': 'controlled' }} />
              <FormControl sx={{ width: '10ch' }}>
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
              <FormControl variant="standard">
                <Select
                  id="demo-select-small"
                  value={age}
                  onChange={(event) => {
                    setAge(event.target.value);
                  }}
                >
                  <MenuItem value={'year'}>Year</MenuItem>
                  <MenuItem value={'quarter'}>Quarter</MenuItem>
                  <MenuItem value={'month'}>Month</MenuItem>
                </Select>
              </FormControl>
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
