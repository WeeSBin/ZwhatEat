import React from 'react'
import {Grid, makeStyles, Box, Typography, Paper} from "@material-ui/core"
import Unlotted from './Unlotted'

const useStyles = makeStyles((theme) => ({
  topGridContainer: {
    height: '30vh',
    background: 'rgb(40, 44, 52)',
    padding: theme.spacing(2)
  },
  topGridItem: {
    height: '100%',
    padding: theme.spacing(2)
  },
  bottomBox: {
    height: '70vh',
    background: 'rgb(40, 44, 52)',
    borderTop: '1px solid rgb(201, 209, 217)',
  },
  paper: {
    height: '100%',
    padding: theme.spacing(2),
    boxSizing: 'border-box'
  }
}))

const Raffle = () => {
  const classes = useStyles()

  return (
    <Box>
      {/* TopGrid #s */}
      <Grid container
            className={classes.topGridContainer}
            alignItems={'center'}
            justify={'center'}
            >
        <Grid item
              className={classes.topGridItem}
              xs={12}
              >
          <Paper className={classes.paper}>
            <Typography>Menu</Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* TopGrid #e */}
      {/* BottomGrid #s */}
      <Box  className={classes.bottomBox}>
        <Unlotted></Unlotted>
        <Unlotted></Unlotted>
      </Box>
      {/* BottomGrid #e */}
    </Box>
  )
}

export default Raffle
