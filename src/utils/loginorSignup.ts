export const loginorSignup = async (
  url: string,
  email: string,
  password: string
) => {
  const user = {
    email,
    password,
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  const returnUser = await response.json()
  console.log('return user from functio', returnUser)
  return returnUser
}
