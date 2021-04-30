import React from 'react'
import {Grid, makeStyles, Box, Typography, Container} from "@material-ui/core"
import Unlotted from './Unlotted'

import clsx from "clsx"

import Regist from './Regist'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0
  },
  topGridContainer: {
    height: '40vh',
    background: 'rgb(30, 34, 42)',
    padding: theme.spacing(2)
  },
  topGridItem: {
    height: '100%',
    padding: theme.spacing(8),
    color: 'rgb(255, 255, 255)',
  },
  raffleMenu: {
    background: 'rgb(40, 44, 52)',
    cursor: 'pointer'
  },
  middleBox: {
    height: '35vh',
    background: 'rgb(30, 34, 42)',
    borderTop: '1px solid rgb(201, 209, 217)',
    overflow: 'scroll',
  },
}))

// 현재 타겟이 되는 이슈의 번호
let issue_number = 0
const getMenu = async (category) => {
  const answer = [] // 메뉴 이름들
  const categoryNum = {
    'korea': 1,
    'china': 2,
    'western': 3,
    'japan': 4,
    'snack': 5
  }
  issue_number = categoryNum[category]
  // 이슈 번호를 사용하여 코멘트 불러오기
  if (issue_number === 0) return 0
  await fetch(`https://api.github.com/repos/wesbin/what-eat/issues/${issue_number}/comments`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(comments => {
      // 메뉴 이름 추출
      comments.forEach(menu => answer.push(menu.body))
    })

  return answer
}

const Raffle = ({token, match}) => {
  const [menus, setMenus] = React.useState([]) // Git에서 불러온 전체 메뉴
  const [raffleResult, setRaffleResult] = React.useState('') // 메뉴 추첨 결과
  const category = match.params.category // 선택한 category
  const classes = useStyles() // css
  // Git에서 메뉴 불러와 세팅
  React.useEffect(() => {
    getMenu(category).then(answer => {
      if (answer === 0) {
        alert('Error')
      } else {
        setMenus(answer)
      }
    })
  }, [category])
  // 메뉴 추첨
  const raffleMenu = () => {
    const m_len = menus.length
    if (m_len < 1) {
      alert('메뉴들이 도착하고 있어요!')
    } else {
      const randomNum = Math.floor(Math.random() * m_len) // 랜덤 변수
      setRaffleResult(menus[randomNum])
    }
  }
  // 메뉴 등록 후 업데이트
  const updateMenu = () => {
    getMenu(category).then(answer => {
      if (answer === 0) {
        alert('Error')
      } else {
        setMenus(answer)
      }
    })
  }

  return (
    <Box>
      <Container  maxWidth={'lg'}
                  className={classes.container}
      >
        {/* Top #s */}
        <Grid container
              className={classes.topGridContainer}
              alignItems={'center'}
              justify={'center'}
        >
          <Grid item
                className={classes.topGridItem}
                xs={12}
          >
            <Typography variant={'h2'}
                        align={'left'}
            >
              오늘은
            </Typography>
            <Typography variant={'h2'}
                        className={classes.raffleMenu}
                        align={'left'}
                        onClick={(e) => {
                          raffleMenu()
                        }}
            >
              {raffleResult ? raffleResult : '이건'}
            </Typography>
            <Typography variant={'h2'}
                        align={'left'}
            >
              어때요
            </Typography>
          </Grid>
        </Grid>
        {/* Top #e */}
        {/* Middle #s */}
        <Box  className={classes.middleBox}>
          <Unlotted unlotted={menus}></Unlotted>
        </Box>
        {/* Middle #e */}
        {/* Bottom #s */}
        <Regist token={token} issueNumber={issue_number} category={category} updateMenu={updateMenu}/>
        {/* Bottom #e */}
      </Container>
    </Box>
  )
}

export default Raffle
