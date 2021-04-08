import './App.css';
import {Box, Container, Grid} from "@material-ui/core";
import Category from "./components/Category"
import {useEffect, useState} from "react"

function App() {

  const [korean, setKorean] = useState(true)
  const [western, setWestern] = useState(true)
  const [china, setChina,] = useState(true)
  const [japan, setJapan] = useState(true)
  const [snack, setSnack] = useState(true)

  const handleClick = (category) => {
    switch (category) {
      case `korean`:
        setKorean(!korean)
        break
      case `western`:
        setWestern(!western)
        break
      case `china`:
        setChina(!china)
        break
      case `japan`:
        setJapan(!japan)
        break
      case `snack`:
        setSnack(!snack)
        break
      default:
        console.log("Error, handleClick")
    }
  }

  return (
    <div className="App">
      <Box>
        <Container maxWidth={`lg`}>
          <Grid container
                direction={`column`}
          >

            <Category pick={korean} category={`korean`} onClick={handleClick} />
            <Category pick={western} category={`western`} onClick={handleClick} />
            <Category pick={china} category={`china`} onClick={handleClick} />
            <Category pick={japan} category={`japan`} onClick={handleClick} />
            <Category pick={snack} category={`snack`} onClick={handleClick} />

          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default App
