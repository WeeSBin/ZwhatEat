import React from 'react'
import queryString from 'query-string'
import {CircularProgress} from "@material-ui/core"

const Login = ({history, location, match, setAuthCode, raffle}) => {
  const query = queryString.parse(location.search) // URL 파싱

  React.useEffect(() => {
    setAuthCode(query.code)
  })

  if (raffle) {
    // history.push('/raffle/' + raffle)
  }

  return (
    <div>
      <CircularProgress color="primary"
                        size={100}
      />
    </div>
  )
}

export default Login
