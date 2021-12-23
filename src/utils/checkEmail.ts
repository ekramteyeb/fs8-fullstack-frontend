export const checkEmail = async (email: string) => {
  const response = await fetch(
    'http://localhost:3001/api/v1/users/checkEmail',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    }
  )
  const emailResponse = await response.json()
  if (emailResponse.statusCode) {
    return emailResponse.message
  }
  return emailResponse
}
