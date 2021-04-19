import React from 'react'
import {Grid, makeStyles, Box, Button} from "@material-ui/core"
import {Octokit} from "@octokit/core"

const useStyles = makeStyles((theme) => ({
  bottomBox: {
    height: '25vh',
    background: 'rgb(30, 34, 42)',
    borderTop: '1px solid rgb(201, 209, 217)',
  },
  bottomGridContainer: {
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '760px',
    padding: theme.spacing(2),
  },
  register: {
    background: 'rgb(40, 44, 52)',
    border: '1px solid rgb(201, 209, 217)',
    borderRadius: '6px',
  },
  registerHeader: {
    padding: '8px 8px 0',
    marginBottom: '-1px',
    zIndex: '1'
  },
  registerBody: {
    background: 'rgb(30, 34, 42)',
    padding: theme.spacing(1),
    borderTop: '1px solid rgb(201, 209, 217)',
  },
  registerFooter: {
    background: 'rgb(30, 34, 42)',
    padding: '0 8px 8px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: '6px'
  },
  textArea: {
    resize: 'vertical',
    width: '100%',
    minHeight: '90px',
    padding: theme.spacing(1),
    borderRadius: '6px',
    lineHeight: '1.5'
  },
  registerButton: {
    textTransform: 'none'
  },
  registerTab: {
    padding: '8px 16px',
    color: 'rgb(255, 255, 255)',
    background: 'rgb(30, 34, 42)',
    border: '1px solid rgb(201, 209, 217)',
    borderBottom: '0',
    borderRadius: '6px 6px 0 0',
  }
}))
// 인증
const octokit = new Octokit({
  auth: process.env.REACT_APP_AUTH
})
// 현재 타겟이 되는 이슈의 번호
let issue_number = 0

const Regist = ({authCode}) => {

  const classes = useStyles()

  const [registValue, setRegistValue] = React.useState('')
  // 메뉴 등록
  const registMenu = (value) => {
    octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
      owner: 'wesbin',
      repo: 'what-eat',
      issue_number: issue_number,
      body: value
    })
  }

  return (
    <Box className={classes.bottomBox}>
      <Grid container
            className={classes.bottomGridContainer}
      >
        <Grid container
              className={classes.register}
        >
          {/* Header #s */}
          <Grid container
                className={classes.registerHeader}
                >
            <Grid item
                  className={classes.registerTab}
                  >
              메뉴
            </Grid>
          </Grid>
          {/* Header #e */}
          {/* Body #s */}
          <Grid container
                className={classes.registerBody}
                >
            <textarea className={classes.textArea}
                      placeholder={'등록하고 싶은 메뉴를 적어주세요.'}
                      onChange={(e) => {
                        setRegistValue(e.target.value)
                      }}
                      />
          </Grid>
          {/* Body #s */}
          {/* Footer #s */}
          <Grid container
                className={classes.registerFooter}
                >
            {
              authCode !== '' ?
              <Button variant={'contained'}
              size={'small'}
              className={classes.registerButton}
              onClick={(e) => {
                registMenu(registValue)
              }}
              >
                등록
              </Button>
              :
              <Button variant={'contained'}
              size={'small'}
              className={classes.registerButton}
              onClick={(e) => {
                fetch('https://github.com/login/oauth/authorize?client_id=c6f918954021d8a939f9')
              }}
              >
                GitHub 로그인
              </Button>
            }
          </Grid>
          {/* Footer #e */}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Regist
