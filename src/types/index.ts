import { ProductState } from './product'
import { UserState } from './user'

export type AppState = {
  product: ProductState
  user: UserState
}
