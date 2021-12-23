import axios from 'axios'

const url = 'http://localhost:3001/api/v1/products/'

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
