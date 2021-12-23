export const sendEmail = async (
  url: string,
  email: string
) => {
  const user = {
    email,
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  const returnUser = await response.json()
  return returnUser
}
