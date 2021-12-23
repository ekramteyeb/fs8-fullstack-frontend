export const resetpassword = async (
  url: string,
  confirmpassword: string,
  password: string,
  token: string,
) => {
  const user = {
    password,
    confirmpassword,
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
    body: JSON.stringify(user),
  })
  const response = await res.json()
  console.log('response from reset password ft end', response)
  return response
}