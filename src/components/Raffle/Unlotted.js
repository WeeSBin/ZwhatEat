import React from 'react'
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  bottomGridContainer: {
    height: '100%',
    padding: theme.spacing(1)
  },
  bottomGridItem: {
    padding: theme.spacing(1)
  },
  paper: {
    height: '100%',
    padding: theme.spacing(2),
    maxHeight: '58px'
  }
}))

const Unlotted = ({unlotted}) => {
  const classes = useStyles()
  return (
    <Grid container
          className={classes.bottomGridContainer}
    >
      {unlotted.map(menu => {
        return (
          <Grid item
                xs={3}
                className={classes.bottomGridItem}
                key={menu}
          >
            <Paper  className={classes.paper}
                    variant={'outlined'}
            >
              <Typography>{menu}</Typography>
            </Paper>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Unlotted
