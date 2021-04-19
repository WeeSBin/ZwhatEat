import React from 'react'
import {Grid, makeStyles, Box, Typography, Container} from "@material-ui/core"
import Unlotted from './Unlotted'
import {Octokit} from "@octokit/core"

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

// 인증
const octokit = new Octokit({
  auth: process.env.REACT_APP_AUTH
})
// 현재 타겟이 되는 이슈의 번호
let issue_number = 0
// 메뉴 가져오기
const getMenu = async (category) => {
  // 이슈 가져오기
  const issueList = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: 'wesbin',
    repo: 'what-eat'
  })
  // 현재 카테고리에 맞는 이슈의 번호 찾기
  const i_len = issueList.data.length
  for (let i = 0; i < i_len; i++) {
    const issue = issueList.data[i]
    if (issue.title === category) {
      issue_number = issue.number
    }
  }
  // 이슈 번호를 이용하여 코멘트 가져오기
  if (issue_number === 0) {
    return 0
  } else {
    const comments = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
      owner: 'wesbin',
      repo: 'what-eat',
      issue_number: issue_number
    })
    // 메뉴 이름 추출
    const answer = []
    comments.data.forEach(menu => answer.push(menu.body))

    return answer
  }
}

const Raffle = ({authCode, match}) => {
  const category = match.params.category
  const classes = useStyles()

  const [menus, setMenus] = React.useState([])
  const [raffleResult, setRaffleResult] = React.useState('')

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
