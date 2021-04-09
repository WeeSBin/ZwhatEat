import * as React from 'react';
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  grid: {
    height: `20vh`,
    'background-image': "url('/images/korean.jpg')"
  },
  disable: {
    opacity: 0.5
  },
  typography: {
    color: `white`
  }
}))

function rtnCategoryName(key) {
  switch (key) {
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
  return prevProps.category[prevProps.name] === nextProps.category[nextProps.name];
}

const Category = ({category, onClick, name}) => {
  const classes = useStyles()

  return (
    <Grid item
          className={clsx(classes.grid,{
            [classes.disable]: !category[name]
          })}
          onClick={(e) => {
            onClick(name)
          }}
    >
      <Typography variant={`h5`}
                  className={classes.typography}
      >
        {rtnCategoryName(name)}
      </Typography>
    </Grid>
  )
}

export default React.memo(Category, areEqual)
