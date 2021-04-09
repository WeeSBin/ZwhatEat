import Category from "./Category"
import Grid from "@material-ui/core/Grid"
import {useState} from "react"
import React from "react"

const Main = () => {

  const [category, setCategory] = useState(
    {
      korean: true,
      western: true,
      china: true,
      japan: true,
      snack: true
    }
  )

  const handleClick = (name) => {
    setCategory(category => category[name] = !category[name])
  }

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