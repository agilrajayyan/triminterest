import { useState, useEffect } from 'react';
import classes from './EmiPlans.module.css';
import shared from '../../styles.module.css';
import EmiList from './EmiList/EmiList';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import AcceleratedPlanParams from './AcceleratedPlanParams/AcceleratedPlanParams';
import {
  formatNumber,
  getPrePaymentEmiPlan,
  getRegularEmiPlan,
  groupPaymentsByYear,
} from './../../utils/helper';

function EmiPlans(props) {
  const [regularEmiPlan, setRegularEmiPlan] = useState({});
  const [prepaymentEmiPlan, setPrepaymentEmiPlan] = useState({});
  const [prePaymentPlanBenefits, setPrePaymentPlanBenefits] = useState({});
  const [acceleratedPlanParams, setAcceleratedPlanParams] = useState({});

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
      emiHikeRate: acceleratedPlanParams.emiHikeRate,
      prepayment: acceleratedPlanParams.prepayment,
    });
  }, [props.emiParams, acceleratedPlanParams]);

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
      {/* Regular EMI plan */}
      <div className={`${classes.regular_emi}`}>
        <EmiList emiPlan={regularEmiPlan} />
      </div>
      {/* Accelerated EMI plan */}
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
            <AcceleratedPlanParams
              onChangeParams={(params) => {
                setAcceleratedPlanParams(params);
              }}
            />
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
