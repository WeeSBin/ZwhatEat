import React from 'react'
import Category from "./Category"
import Grid from "@material-ui/core/Grid"

const Main = ({category, handleClick}) => {
  return (
    <Grid container
          direction={`column`}
    >
      <Category category={category} name={`korean`} onClick={handleClick} />
      <Category category={category} name={`western`} onClick={handleClick} />
      <Category category={category} name={`china`} onClick={handleClick} />
      <Category category={category} name={`japan`} onClick={handleClick} />
      <Category category={category} name={`snack`} onClick={handleClick} />
    </Grid>
  )
}

export default Main