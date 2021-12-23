import axios from 'axios'

export const fetchUser = async (id: string, token: string) => {
  try {
    const res = await axios.get(`http://localhost:3001/api/v1/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (err: any) {
    return 'Something went wrong while fetching user'
  }
}
