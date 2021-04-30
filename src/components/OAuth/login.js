import React from 'react'
import queryString from 'query-string'
import {CircularProgress, Box, makeStyles, Typography} from "@material-ui/core"
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  box: {
    marginLeft: 'calc(50% - 50px)',
    marginTop: 'calc(50vh - 100px)'
  },
  typo_first: {
    marginTop: '100px',
    textAlign: 'center'
  },
  typo_else: {
    textAlign: 'center'
  }
}))

const Login = ({history, location, match, setToken}) => {
  const classes = useStyles() // css
  const query = queryString.parse(location.search) // URL 파싱
  const category = match.params.category // 선택한 category
  
  const getToken = async (code) => {
    // 토큰 발급
    await fetch(`${process.env.REACT_APP_PROXY}/access_token/${code}/${process.env.REACT_APP_STATE}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(json => {
        if (json.hasOwnProperty('access_token')) {
          setToken(json.access_token)
          history.push(`/raffle/${category}`)
        } else {
          // 서버가 꺼져있는 경우 반복 요청(서버 실행시간 13초)
          setTimeout(() => [
            getToken(code)
          ], 15000)
        }
      })
  }

  React.useEffect(() => {
    getToken(query.code)
  })

  return (
    <Box>
      <Box  className={classes.box}>
        <CircularProgress color="primary" 
                          size={100}
        />
      </Box>
      <Typography className={classes.typo_first}>
        잠시 기다려주세요. <strike>무료 서버라서 그런지 느리네요.</strike>
      </Typography>
      <Typography className={classes.typo_else}>
        아니면 
        <Link to={`/raffle/${category}`}><b> 여길 </b></Link>
        눌러서 이전 화면으로 돌아가셨다가
      </Typography>
      <Typography className={classes.typo_else}>
        조금 있다가 다시 돌아오면 될 거에요!!!
      </Typography>
    </Box>
  )
}

export default Login
