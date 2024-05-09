import { AuthTypes } from '../Types';
import { ProviderTypes } from '../../../Firebase/Helpers';

export const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case AuthTypes.logInWithOutProvider:
      return {
        ...state,
        provider: ProviderTypes.NoProvider,
        logged: true,
        user: action.payload,
      };

    case AuthTypes.logInWithGitHub:
      return {
        ...state,
        provider: ProviderTypes.GitHubProvider,
        logged: true,
        user: action.payload,
      };

    case AuthTypes.logInWithGoogle:
      return {
        ...state,
        provider: ProviderTypes.GoogleProvider,
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
