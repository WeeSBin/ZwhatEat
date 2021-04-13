import React from 'react'
import {Grid, makeStyles, Box, Typography, Paper} from "@material-ui/core"
import Unlotted from './Unlotted'
import {Octokit} from "@octokit/core";

const useStyles = makeStyles((theme) => ({
  topGridContainer: {
    height: '30vh',
    background: 'rgb(40, 44, 52)',
    padding: theme.spacing(2)
  },
  topGridItem: {
    height: '100%',
    padding: theme.spacing(2)
  },
  bottomBox: {
    height: '70vh',
    background: 'rgb(40, 44, 52)',
    borderTop: '1px solid rgb(201, 209, 217)',
  },
  paper: {
    height: '100%',
    padding: theme.spacing(2),
    boxSizing: 'border-box'
  }
}))

const getMenu = async (category) => {
  // authentication
  const octokit = new Octokit({
    auth: process.env.REACT_APP_AUTH
  })
  // get issues
  const issueList = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: 'wesbin',
    repo: 'what-eat'
  })
  // get target category issue number
  let issue_number = 0
  const i_len = issueList.data.length
  for (let i = 0; i < i_len; i++) {
    const issue = issueList.data[i]
    if (issue.title === category) {
      issue_number = issue.number
    }
  }
  // get comments use issue number
  if (issue_number === 0) {
    return 0
  } else {
    const comments = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
      owner: 'wesbin',
      repo: 'what-eat',
      issue_number: issue_number
    })
    // Raffle
    const answer = {lotted: '', unlotted: []}
    const c_len = comments.data.length
    const randomNum = Math.floor(Math.random() * c_len)
    for (let i = 0; i < c_len; i++) {
      if (i === randomNum) {
        answer.lotted = comments.data[i].body
      } else {
        answer.unlotted.push(comments.data[i].body)
      }
    }
    return answer
  }
}

const Raffle = ({category}) => {
  const classes = useStyles()

  const result = getMenu(category) // 추첨 결과
  if (result === 0) {
    // 에러
  } else {
    
  }
  

  return (
    <Box>
      {/* TopGrid #s */}
      <Grid container
            className={classes.topGridContainer}
            alignItems={'center'}
            justify={'center'}
            >
        <Grid item
              className={classes.topGridItem}
              xs={12}
              >
          <Paper className={classes.paper}>
            <Typography>Menu</Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* TopGrid #e */}
      {/* BottomGrid #s */}
      <Box  className={classes.bottomBox}>
        <Unlotted></Unlotted>
        <Unlotted></Unlotted>
      </Box>
      {/* BottomGrid #e */}
    </Box>
  )
}

export default Raffle
