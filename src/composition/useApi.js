export default function useApi() {
  // const api = "http://85.193.88.71:99"; //prod
  const api = 'http://api.work.custom-development-team.su' // test
  const Token = 'Bearer' + ' ' + localStorage.getItem('Token')
  const paramsImg = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const params = {
    headers: {
      Authorization: Token
    }
  }

  return {
    api,
    params,
    Token,
    paramsImg
  }
}
