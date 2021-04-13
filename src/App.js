import './App.css';
import {Box, Container} from "@material-ui/core";
import {useState} from "react"
import Main from "./components/Main/Main"
import Raffle from "./components/Raffle/Raffle"

import Search from "./components/Raffle/Search"

const App = () => {
  // 활성화, 비활성화 토글 변수
  const [category, setCategory] = useState(
    {
      korean: true,
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
    let cnt = 0;
    for (const key in category) {
      if (category[key]) cnt++
    }
    if (cnt > 1) {
      return false
    } else {
      return true
    }
  }

  return (
    <div className="App">
      <Box>
        <Container maxWidth={`lg`}>
          {
            chkCategory() ? 
            <Main category={category} handleClick={handleClick}></Main>
            :
            <Raffle category={'china'}/>
            // <Search></Search>
          }
        </Container>
      </Box>
    </div>
  )
}

export default App
