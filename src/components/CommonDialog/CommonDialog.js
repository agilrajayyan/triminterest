import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useTranslation } from 'react-i18next';

function CommonDialog(props) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={props.open || false}
      onClose={() => {
        props.onClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
          }}
          sx={{ textTransform: 'none' }}
        >
          {t('ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommonDialog;
