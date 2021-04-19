import React from 'react'
import queryString from 'query-string'
import {Link} from  'react-router-dom'
// import { createOAuthAppAuth, createOAuthUserAuth } from "@octokit/auth-oauth-app";

// const OAuth = async () => {
//   const appOctokit = new Octokit({
//     authStrategy: createOAuthAppAuth,
//     auth: {
//       clientId: 'c6f918954021d8a939f9',
//       clientSecret: process.env.REACT_APP_CLIENT_SECRETS
//     }
//   })



//   const userOctokit = await appOctokit.auth({
//     type: 'oauth-user',
//     code
//   })
// }

const login = ({history, location, match, setAuthCode}) => {
  const query = queryString.parse(location.search) // URL 파싱

  console.log(query)

  // setAuthCode(query.code)
  // history.goBack()

  return (
    <Link to={'/'}>{query.code}</Link>
  )
}

export default login
