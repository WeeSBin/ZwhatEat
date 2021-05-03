import React from 'react'
import {Grid, makeStyles, Typography} from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  grid: {
    height: `20vh`,
    background: 'rgb(30, 34, 42)',
    minHeight: '100px'
    // 'background-image': "url('/images/korean.jpg')"
  },
  disable: {
    opacity: 0.5
  },
  typography: {
    color: `white`
  }
}))

const areEqual = (prevProps, nextProps) => {
  return prevProps.category[prevProps.name] === nextProps.category[nextProps.name]
}

const Category = ({category, onClick, name}) => {
  const classes = useStyles()
  // category 이름 번역
  const transCategory = (key) => {
    switch (key) {
      case 'korea':
        return '한식'
      case 'western':
        return '양식'
      case 'china':
        return '중식'
      case 'japan':
        return '일식'
      case 'snack':
        return '분식'
      default:
        return 'Error'
    }
  }

  return (
    <Grid container
          justify={"center"}
          direction={`column`}
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
        {transCategory(name)}
      </Typography>
    </Grid>
  )
}

export default React.memo(Category, areEqual)
