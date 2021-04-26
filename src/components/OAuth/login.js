import React from 'react'
import queryString from 'query-string'
import {CircularProgress, Box, makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  box: {
    marginLeft: '50%',
    marginTop: 'calc(50vh - 100px)'
  }
}))


const Login = ({history, location, match, setToken, raffle}) => {
  const classes = useStyles() // css
  const query = queryString.parse(location.search) // URL 파싱

  const getToken = async (code) => {
    // await fetch(`http://localhost:9999/access_token/${code}/${process.env.REACT_APP_STATE}`)
    await fetch(`https://github-proxy.azurewebsites.net/access_token/${code}/${process.env.REACT_APP_STATE}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(json => {
        if (json.hasOwnProperty('access_token')) {
          setToken(json.access_token)
          history.push('/raffle/' + raffle)
        }
      })
  }

  React.useEffect(() => {
    getToken(query.code)
  })

  return (
    <Box  className={classes.box}>
      <CircularProgress color="primary" 
                        size={100}
      />
    </Box>
  )
}

export default Login
