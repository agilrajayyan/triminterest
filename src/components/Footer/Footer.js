import { Typography, Link } from '@mui/material';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.footer}>
      <Typography variant="caption" align="center" display="block" gutterBottom>
        Made with <FavoriteTwoToneIcon className={classes.favourite_icon} /> by
        <Link
          href="https://linktr.ee/agilrajayyan"
          target="_blank"
          underline="hover"
        >
          &nbsp;Agil Rajayyan
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
