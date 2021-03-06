import './App.css';
import {Box, Container, makeStyles} from "@material-ui/core";
import React, {useState} from "react"
import Main from "./components/Main/Main"

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0
  },
}))

// proxy 서버 켜기
fetch(`${process.env.REACT_APP_PROXY}/state/check`)
  .then(response => {
    if (!response.ok) {
      console.log('proxy, on') 
    }
  })

const App = ({history, SetRaffle}) => {
  const classes = useStyles() // CSS
  // 활성화, 비활성화 토글 변수
  const [category, setCategory] = useState(
    {
      korea: true,
      western: true,
      china: true,
      japan: true,
      snack: true
    }
  )
  // 클릭하면 해당 카테고리 활성화 혹은 비활성화
  const handleClick = (name) => {
    setCategory(category => category = {...category, [name]: !category[name]})
  }
  // 활성화된 category가 한개면 true
  const chkCategory = () => {
    let raffle = ''
    for (const [key, value] of Object.entries(category)) {
      if (value) {
        if (raffle !== '') {
          return false
        } else {
          raffle = key
        }
      }
    }
    return raffle
  }

  React.useEffect(() => {
    const key = chkCategory()
    if (key) {
      history.push(`/raffle/${key}`)
    }
  })

  return (
    <div className="App">
      <Box>
        <Container  maxWidth={`lg`}
                    className={classes.container}
        >
          <Main category={category} handleClick={handleClick}></Main>
        </Container>
      </Box>
    </div>
  )
}

export default App
