import { UserState, UserActions, ADD_USER, REMOVE_USER } from '../../types/user'

export default function user(
  state: UserState = {
    loggedIn: {
      id: '',
      email: '',
    },
  },
  action: UserActions
): UserState {
  switch (action.type) {
  case ADD_USER: {
    const { user } = action.payload
    if (state.loggedIn.id === user.id) {
      return state
    }
    // Always return new state (e.g, new object) if changed
    return {
      ...state,
      loggedIn: { ...state.loggedIn, id: user.id, email: user.email },
    }
  }
  case REMOVE_USER: {
    //const { user } = action.payload
    return { ...state, loggedIn: { ...state.loggedIn, id: '', email: '' } }
  }

  default:
    return state
  }
}
