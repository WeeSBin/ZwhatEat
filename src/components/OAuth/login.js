import React from 'react'
import queryString from 'query-string'
import {Link} from  'react-router-dom'

const Login = ({history, location, match, setAuthCode, raffle}) => {
  const query = queryString.parse(location.search) // URL 파싱

  React.useEffect(() => {
    setAuthCode(query.code)
  })

  if (raffle !== '') {
    history.push('/raffle/' + raffle)
  }

  return (
    <Link to={'/'}>죄송합니다. GitHub 로그인 중에 에러가 발생했습니다. 클릭하시면 첫 화면으로 돌아갑니다.</Link>
  )
}

export default Login
