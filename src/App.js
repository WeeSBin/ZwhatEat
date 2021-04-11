import './App.css';
import {Box, Container} from "@material-ui/core";
import {useState} from "react"
import Main from "./components/Main/Main"

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
    // 왜 개발자 모드에선 두번 실행되는 것처럼 보이는거지?
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
          <p>Raffle</p>
          :
          <Main category={category} handleClick={handleClick}></Main>
          }
        </Container>
      </Box>
    </div>
  )
}

export default App
