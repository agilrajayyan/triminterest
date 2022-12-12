import { useState, useEffect, useReducer, useContext } from 'react';
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
  formatCurrency,
  getAcceleratedEmiPlan,
  getRegularEmiPlan,
} from './../../utils/helper';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { UserPreferenceContext } from './../../utils/UserPreferenceContext';
ChartJS.register(ArcElement, Tooltip, Legend);

const acceleratedEmiReducer = (state, action) => {
  switch (action.type) {
    case 'EMI_PARAMS_CHANGED': {
      const { interestRate, numberOfMonths, loanAmount, emiStartDate } =
        action.payload;
      return {
        ...state,
        plan: getAcceleratedEmiPlan({
          interestRate,
          numberOfMonths,
          loanAmount,
          emiStartDate,
          emiHikeRate: state.emiHikeRate,
          regularPrepayment: state.regularPrepayment,
        }),
      };
    }

    case 'ACC_PARAMS_CHANGED': {
      const {
        emiHikeRate,
        regularPrepayment,
        interestRate,
        numberOfMonths,
        loanAmount,
        emiStartDate,
      } = action.payload;
      return {
        ...state,
        emiHikeRate,
        regularPrepayment,
        plan:
          interestRate && numberOfMonths && loanAmount && emiStartDate
            ? getAcceleratedEmiPlan({
                interestRate,
                numberOfMonths,
                loanAmount,
                emiStartDate,
                emiHikeRate,
                regularPrepayment,
              })
            : {},
      };
    }
    default:
      return state;
  }
};

function EmiPlans(props) {
  const [regularEmiPlan, setRegularEmiPlan] = useState({});
  const [acceleratedEmi, dispatch] = useReducer(acceleratedEmiReducer, {
    plan: null,
    emiHikeRate: null,
    regularPrepayment: null,
  });
  const userPreference = useContext(UserPreferenceContext);

  const accParamsChangeHandler = (eventData) => {
    const { interestRate, numberOfYears, loanAmount, emiStartDate } =
      props.emiParams;
    dispatch({
      type: 'ACC_PARAMS_CHANGED',
      payload: {
        ...eventData,
        interestRate,
        numberOfMonths: numberOfYears * 12,
        loanAmount,
        emiStartDate,
      },
    });
  };

  useEffect(() => {
    const { interestRate, numberOfYears, loanAmount, emiStartDate } =
      props.emiParams;
    const emiParamsExists = Object.values(props.emiParams).some(
      (emiParam) => emiParam
    );
    if (!emiParamsExists) return;

    const emiPlan = getRegularEmiPlan({
      interestRate,
      numberOfMonths: numberOfYears * 12,
      loanAmount,
      emiStartDate,
    });
    setRegularEmiPlan(emiPlan);
    dispatch({
      type: 'EMI_PARAMS_CHANGED',
      payload: {
        interestRate,
        numberOfMonths: numberOfYears * 12,
        loanAmount,
        emiStartDate,
      },
    });
  }, [props.emiParams]);

  const getInterestSaved = () => {
    const regularEmiInterest =
      (regularEmiPlan && regularEmiPlan.totalInterest) || 0;
    const acceleratedEmiInterest =
      (acceleratedEmi &&
        acceleratedEmi.plan &&
        acceleratedEmi.plan.totalInterest) ||
      0;
    return formatCurrency(
      regularEmiInterest - acceleratedEmiInterest,
      userPreference.locale,
      userPreference.currency
    );
  };

  const getInstallmentsReducedBy = () => {
    const regularPlanInstallments =
      (regularEmiPlan && regularEmiPlan.numberOfInstallments) || 0;
    const accPlanInstallments =
      (acceleratedEmi &&
        acceleratedEmi.plan &&
        acceleratedEmi.plan.numberOfInstallments) ||
      0;
    const numberOfInstallments = regularPlanInstallments - accPlanInstallments;
    return `${Math.floor(numberOfInstallments / 12)} years & ${
      numberOfInstallments % 12
    } months`;
  };

  const regularEmiChartData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [regularEmiPlan.totalPrincipal, regularEmiPlan.totalInterest],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
      },
    ],
  };

  const accEmiChartData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [
          acceleratedEmi.plan?.totalPrincipal,
          acceleratedEmi.plan?.totalInterest,
        ],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
      },
    ],
  };

  return (
    <div>
      <section
        className={`${classes.emi_summary_container} ${shared.flex_h} ${shared.justify_center}`}
      >
        <div>
          <div className={classes.doughtnut_chart}>
            <Doughnut data={regularEmiChartData} />
          </div>
          {/* Regular EMI plan */}
          <div className={classes.regular_emi}>
            <EmiList emiPlan={regularEmiPlan} prepaymentEnabled={false} />
          </div>
        </div>
        {/* Accelerated EMI plan */}
        <Card style={{ background: '#f1f8fe' }}>
          <div className={classes.doughtnut_chart}>
            <Doughnut data={accEmiChartData} />
          </div>
          <CardActions>
            <div className={classes.additional_payments}>
              <section className={classes.benefits_container}>
                <Typography variant="caption">You could save</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {getInterestSaved()}
                </Typography>
                <Typography variant="caption">
                  Installments reduced by
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {getInstallmentsReducedBy()}
                </Typography>
              </section>
              <AcceleratedPlanParams onChangeParams={accParamsChangeHandler} />
            </div>
          </CardActions>
          <CardContent>
            <EmiList emiPlan={acceleratedEmi.plan} prepaymentEnabled={true} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default EmiPlans;
