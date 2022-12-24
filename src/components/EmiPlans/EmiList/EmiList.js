import Typography from '@mui/material/Typography';
import EmiDetailsTable from './EmiDetailsTable/EmiDetailsTable';
import classes from './EmiList.module.css';
import shared from '../../../styles.module.css';
import { useState, useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function EmiList(props) {
  const [emiPlan, setEmiPlan] = useState([]);

  const visibilityHandler = (year, visibility) => {
    setEmiPlan((prevEmiPlan) => {
      return prevEmiPlan?.map((elem) => {
        return {
          ...elem,
          detailedView: elem.year === year ? visibility : elem.detailedView,
        };
      });
    });
  };

  useEffect(() => {
    const summary = props.emiPlan?.payments?.map((elem, index) => {
      return {
        ...elem,
        detailedView: index === 0 ? true : false,
      };
    });
    setEmiPlan(summary);
  }, [props.emiPlan]);

  const expandOrShrink = (year, detailedView) => {
    return detailedView ? (
      <KeyboardArrowDownIcon
        className={classes.arrow_icon}
        onClick={() => {
          visibilityHandler(year, false);
        }}
      />
    ) : (
      <KeyboardArrowRightIcon
        className={classes.arrow_icon}
        onClick={() => {
          visibilityHandler(year, true);
        }}
      />
    );
  };

  return (
    <div>
      <h2>
        {emiPlan?.map((yearlyDetails) => {
          return (
            <div key={yearlyDetails.year}>
              <div className={classes.emi_list_header}>
                {expandOrShrink(yearlyDetails.year, yearlyDetails.detailedView)}
                <Typography variant="h4" gutterBottom>
                  {yearlyDetails.year}
                </Typography>
              </div>
              {yearlyDetails.detailedView && (
                <EmiDetailsTable
                  classes={classes.emi_details_table}
                  payments={yearlyDetails.payments}
                  prepaymentEnabled={props.prepaymentEnabled}
                />
              )}
            </div>
          );
        })}
      </h2>
    </div>
  );
}

export default EmiList;
