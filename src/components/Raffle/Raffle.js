import React from 'react'
import {Grid, makeStyles, Box, Typography, Container} from "@material-ui/core"
import Unlotted from './Unlotted'

import clsx from "clsx"

import Regist from './Regist'

const useStyles = makeStyles((theme) => ({
  topGridContainer: {
    height: '40vh',
    background: 'rgb(30, 34, 42)',
    padding: theme.spacing(2)
  },
  topGridItem: {
    height: '100%',
    padding: theme.spacing(8)
  },
  whiteText: {
    color: 'rgb(255, 255, 255)',
  },
  raffleMenu: {
    background: 'rgb(40, 44, 52)'
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
  // 이슈 가져오기
  await fetch('https://api.github.com/repos/wesbin/what-eat/issues')
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(issueList => {
      // 현재 카테고리에 맞는 이슈 번호 찾기
      const i_len = issueList.length
      for (let i = 0; i < i_len; i++) {
        const issue = issueList[i]
        if (issue.title === category) {
          issue_number = issue.number
        }
      }
    })
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

const Raffle = ({authCode, match}) => {
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
  }, [])
  // 메뉴 추첨
  const raffleMenu = () => {
    const m_len = menus.length
    const randomNum = Math.floor(Math.random() * m_len) // 랜덤 변수
    setRaffleResult(menus[randomNum])
  }

  return (
    <Box>
      <Container maxWidth={'lg'}>
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
                        className={classes.whiteText}
                        align={'left'}
            >
              오늘은
            </Typography>
            <Typography variant={'h2'}
                        className={clsx(classes.whiteText, classes.raffleMenu)}
                        align={'left'}
                        onClick={(e) => {
                          raffleMenu()
                        }}
            >
              {raffleResult ? raffleResult : '이건'}
            </Typography>
            <Typography variant={'h2'}
                        className={classes.whiteText}
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
        <Regist authCode={authCode}/>
        {/* Bottom #e */}
      </Container>
    </Box>
  )
}

export default Raffle
