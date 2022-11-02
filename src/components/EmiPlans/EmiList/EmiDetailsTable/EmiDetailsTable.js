import classes from './EmiDetailsTable.module.css';
import Typography from '@mui/material/Typography';
import { formatNumber, getMonthByIndex } from '../../../../utils/helper';
import TextField from '@mui/material/TextField';

function EmiDetailsTable(props) {
  const tableHeaderCell = `${classes.table_header_cell}`;

  return (
    <table className={`${classes.table} ${props.classes}`}>
      <thead>
        <tr>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">Month</Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">EMI</Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">Principal</Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">Interest</Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">Prepayment</Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">Loan Remaining</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.data?.map((elem, index) => {
          return (
            <tr key={elem.loanRemaining}>
              <td
                className={`${classes.table_cell} ${
                  index % 2 !== 0 ? classes.dark_bg : ''
                }`}
              >
                <Typography variant="body2">
                  {getMonthByIndex(elem.paymentDate.getMonth())}
                </Typography>
              </td>
              <td
                className={`${classes.table_cell} ${
                  index % 2 !== 0 ? classes.dark_bg : ''
                }`}
              >
                <Typography variant="body2">
                  {formatNumber(elem.emi)}
                </Typography>
              </td>
              <td
                className={`${classes.table_cell} ${
                  index % 2 !== 0 ? classes.dark_bg : ''
                }`}
              >
                <Typography variant="body2">
                  {formatNumber(elem.pricipalComponent)}
                </Typography>
              </td>
              <td
                className={`${classes.table_cell} ${
                  index % 2 !== 0 ? classes.dark_bg : ''
                }`}
              >
                <Typography variant="body2">
                  {formatNumber(elem.interestComponent)}
                </Typography>
              </td>
              <td
                className={`${classes.table_cell} ${
                  index % 2 !== 0 ? classes.dark_bg : ''
                }`}
              >
                <Typography variant="body2">{elem.prepaymentAmount}</Typography>
              </td>
              <td
                className={`${classes.table_cell} ${
                  index % 2 !== 0 ? classes.dark_bg : ''
                }`}
              >
                <Typography variant="body2">
                  {formatNumber(elem.loanRemaining)}
                </Typography>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EmiDetailsTable;
