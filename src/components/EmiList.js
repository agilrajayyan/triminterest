import Typography from '@mui/material/Typography';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmiDetailsTable from './EmiDetailsTable';
import classes from './EmiList.module.css';
import shared from '../styles.module.css';

function EmiList(props) {
  const clickHandler = (year, visibility) => {
    props.onSetVisibility(year, visibility);
  };

  const getArrowIcon = (year, detailedView) => {
    return detailedView ? (
      <KeyboardArrowDownIcon
        className={classes.arrow_icon}
        onClick={clickHandler.bind(this, year, false)}
      />
    ) : (
      <KeyboardArrowRightIcon
        className={classes.arrow_icon}
        onClick={clickHandler.bind(this, year, true)}
      />
    );
  };

  return (
    <div>
      <h2>
        {props.emiSummary.map((yearlyDetails) => {
          return (
            <div key={yearlyDetails.year}>
              <div className={`${shared.flex_h} ${shared.align_basline}`}>
                {getArrowIcon(yearlyDetails.year, yearlyDetails.detailedView)}
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
