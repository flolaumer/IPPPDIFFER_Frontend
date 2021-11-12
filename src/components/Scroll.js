import { makeStyles } from "@material-ui/core";
import { ExpandLessRounded } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  toTop: {
    zIndex: 99,
    position: 'fixed',
    right: '3%',
    bottom: '2vh',
  }
});


const Scroll = ({
  showBelow
}) => {

  const classes = useStyles();
  
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  }

  useEffect(() => {
    if (showBelow) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  })

  const handleOnClick = () => {
    window['scrollTo']({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      {
        show &&
        <Fab
          color="primary"
          aria-label="top"
          onClick={handleOnClick} className={classes.toTop}>
          <ExpandLessRounded />
        </Fab>
      }
    </div>
  );
}

export default Scroll;