import React from 'react'
import {Grid, makeStyles, Paper} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  bottomGridContainer: {
    height: '25%',
    padding: theme.spacing(1)
  },
  bottomGridItem: {
    height: '100%',
    padding: theme.spacing(1)
  },
  paper: {
    height: '100%',
    padding: theme.spacing(2),
    boxSizing: 'border-box'
  }
}))

const Unlotted = () => {
  const classes = useStyles()

  return (
    <Grid container
          className={classes.bottomGridContainer}
    >
      <Grid item
            xs={3}
            className={classes.bottomGridItem}
      >
        <Paper  className={classes.paper}
                variant={'outlined'}
        >
        </Paper>
      </Grid>
      <Grid item
            xs={3}
            className={classes.bottomGridItem}
      >
        <Paper  className={classes.paper}
                variant={'outlined'}
        >
        </Paper>
      </Grid>
      <Grid item
            xs={3}
            className={classes.bottomGridItem}
      >
        <Paper  className={classes.paper}
                variant={'outlined'}
        >
        </Paper>
      </Grid>
      <Grid item
            xs={3}
            className={classes.bottomGridItem}
      >
        <Paper  className={classes.paper}
                variant={'outlined'}
        >
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Unlotted
