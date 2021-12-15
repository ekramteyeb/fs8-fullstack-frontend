import { Product } from './product'

// Action types
export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'

// A user
export type User = {
  id: string
  userName?: string
  firstName?: string
  lastName?: string
  gender?: string
  email: string
  password?: string
  address?: {
    street?: string
    postalCode?: string
    country: string
  }
  products?: Product[]
  avatar?: string
  createdAt?: string
  isAdmin?: boolean
  googleId?: string
  token?: string
  cart?: Product[]
}

export type AddUserAction = {
  type: typeof ADD_USER
  payload: {
    user: User
  }
}

export type RemoveUserAction = {
  type: typeof REMOVE_USER
  payload: {
    user: User
  }
}

// Use this union in reducer
export type UserActions = AddUserAction | RemoveUserAction

export type UserState = {
  loggedIn: User
}
