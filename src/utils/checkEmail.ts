import { BASE_URL } from '../resources'

export const checkEmail = async (email: string) => {
  const response = await fetch(`${BASE_URL}/users/checkEmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email }),
  })
  const emailResponse = await response.json()
  if (emailResponse.statusCode) {
    return emailResponse.message
  }
  return emailResponse
}
