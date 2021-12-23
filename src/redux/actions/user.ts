import { Dispatch } from 'redux'

import { ADD_USER, REMOVE_USER, UserActions, User } from '../../types/user'

export function addUser(user: User): UserActions {
  return {
    type: ADD_USER,
    payload: {
      user,
    },
  }
}

export function removeUser(user: User): UserActions {
  return {
    type: REMOVE_USER,
    payload: {
      user,
    },
  }
}

// fetch loggedin user from
export function fetchUser(id: string) {
  return (dispatch: Dispatch) => {
    return fetch(id)
      .then((resp) => resp.json())
      .then((user) => {
        localStorage.setItem('loggedinUser', JSON.stringify(user))
        dispatch(addUser(user))
      })
  }
}
