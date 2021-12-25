import axios from 'axios'
import { BASE_URL } from '../resources'

const url = `${BASE_URL}/products/`

export const deleteProduct = async (
  id: string,
  token: string
): Promise<any> => {
  try {
    const response = await axios.delete(`${url}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response
  } catch (err) {
    return err
  }
}
