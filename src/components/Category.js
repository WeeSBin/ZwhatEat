import * as React from 'react';
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  grid: {
    height: `20vh`,
    background: `rgb(40, 44, 52)`
  },
  disable: {
    opacity: 0.9
  },
  typography: {
    color: `white`
  }
}))

function rtnCategoryName(category) {
  switch (category) {
    case `korean`:
      return `한식`
    case `western`:
      return `양식`
    case `china`:
      return `중식`
    case `japan`:
      return `일식`
    case `snack`:
      return `분식`
    default:
      return `Error`
  }
}

const areEqual = (prevProps, nextProps) => {
  return prevProps.pick === nextProps.pick;
}

const Category = ({category, onClick, pick}) => {
  const classes = useStyles()

  return (
    <Grid item
          className={clsx(classes.grid,{
            [classes.disable]: !pick
          })}
          onClick={(e) => {
            onClick(category)
          }}
    >
      <Typography variant={`h5`}
                  className={classes.typography}
      >
        {rtnCategoryName(category)}
      </Typography>
    </Grid>
  )
}

export default React.memo(Category, areEqual)
