import React from 'react'
import queryString from 'query-string'

const login = ({history, location, match}) => {

  const query = queryString.parse(location.search)

  return (
    <div>
      {query.code}
    </div>
  )
}

export default login
