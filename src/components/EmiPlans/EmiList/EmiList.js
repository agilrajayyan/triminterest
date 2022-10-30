import Typography from '@mui/material/Typography';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmiDetailsTable from './EmiDetailsTable/EmiDetailsTable';
import classes from './EmiList.module.css';
import shared from '../../../styles.module.css';
import { useState, useEffect } from 'react';

function EmiList(props) {
  const [emiSummary, setEmiSummary] = useState([]);

  const visibilityHandler = (year, visibility) => {
    setEmiSummary((prevEmiSummary) => {
      return prevEmiSummary?.map((elem) => {
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
        detailedView: true,
      };
    });
    setEmiSummary(summary);
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
        {emiSummary?.map((yearlyDetails) => {
          return (
            <div key={yearlyDetails.year}>
              <div className={`${shared.flex_h} ${shared.align_basline}`}>
                {expandOrShrink(yearlyDetails.year, yearlyDetails.detailedView)}
                <Typography
                  variant="h4"
                  gutterBottom
                  className={shared.margin_bottom_1}
                >
                  {yearlyDetails.year}
                </Typography>
              </div>
              {yearlyDetails.detailedView && (
                <EmiDetailsTable
                  classes={shared.margin_bottom_2}
                  data={yearlyDetails.payments}
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
