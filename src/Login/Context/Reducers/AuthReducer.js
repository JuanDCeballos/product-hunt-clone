import { AuthTypes } from '../Types';

export const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case AuthTypes.logInWithOutProvider:
    case AuthTypes.logInWithGitHub:
    case AuthTypes.logInWithGoogle:
      return {
        ...state,
        logged: true,
        user: action.payload,
      };

    case AuthTypes.logOut:
      return {
        logged: false,
        errorMessage: action.payload?.errorMessage,
      };

    case AuthTypes.error:
      return {
        ...state,
        logged: false,
        errorMessage: action.payload?.errorMessage,
      };
  }
};
