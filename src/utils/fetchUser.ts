import axios from 'axios'
import { BASE_URL } from '../resources'

export const fetchUser = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${BASE_URL}users/${id}`, {
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
