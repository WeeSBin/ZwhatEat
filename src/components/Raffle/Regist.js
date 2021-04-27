import React from 'react'
import {Grid, makeStyles, Box, Button} from "@material-ui/core"

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

const Regist = ({token, issueNumber, category, updateMenu}) => {
  const [registValue, setRegistValue] = React.useState('') // 메뉴 등록 value
  const classes = useStyles() // css
  // code 발급 경로 url 설정
  const params = [
    `client_id=${process.env.REACT_APP_CLIENT_ID}`,
    `state=${process.env.REACT_APP_STATE}`,
    `scope=public_repo`,
    `redirect_uri=https://wesbin.github.io/what-eat/login/${category}`
  ]
  const url = 'https://github.com/login/oauth/authorize?' + params.join('&')
  // 메뉴 등록
  const registMenu = () => {
    fetch(`https://api.github.com/repos/wesbin/what-eat/issues/${issueNumber}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        body: registValue
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((json) => {
        alert(`${registValue} 등록 했습니다. 화면에 보이는건 느릴 수 있어요.`)
        setRegistValue('')
        updateMenu()
      })
      .catch((e) => console.log(e))
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
                      value={registValue}
                      />
          </Grid>
          {/* Body #s */}
          {/* Footer #s */}
          <Grid container
                className={classes.registerFooter}
                >
            {
              token ?
              <Button variant={'contained'}
              size={'small'}
              className={classes.registerButton}
              onClick={registMenu}
              >
                등록
              </Button>
              :
              <Button variant={'contained'}
              size={'small'}
              className={classes.registerButton}>
                <a href={url}>GitHub 로그인</a>
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
