import { useReducer } from 'react';
import { AuthReducer } from './Reducers';
import { LogInContext } from './LogInContext';
import {
  SingInWithOutProvider,
  SingInWithGoogle,
  SingInWithGitHub,
} from '../../Firebase/Functions';
import { AuthTypes } from './Types';
import { singOutCurrent, GetUser } from '../../Firebase/Functions';
import { ProviderTypes } from '../../Firebase/Helpers';
import { IoPlayForwardCircleSharp } from 'react-icons/io5';

const initialState = { logged: false };

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    logged: !!user,
    user,
  };
};

export const LogInProvider = ({ children }) => {
  const [LogInState, dispatch] = useReducer(AuthReducer, initialState, init);

  const LogInWithEmailAndPassWord = async (email, password) => {
    const { ok, uid, photoURL, displayName, errorMessage } =
      await SingInWithOutProvider(email, password);

    switch (ok) {
      case false:
        dispatch({ type: AuthTypes.error, payload: { errorMessage } });
        return false;

      case true:
        const payload = { uid, email, photoURL, displayName };
        const action = { type: AuthTypes.logInWithOutProvider, payload };

        localStorage.setItem('user', JSON.stringify(payload));
        dispatch(action);
        break;
    }
  };

  const LogInWithGoogle = async () => {
    const { ok, error, user } = await SingInWithGoogle();

    if (!ok) {
      dispatch({ type: AuthTypes.error, payload: error });
      return false;
    }

    const { uid, displayName, photoURL } = user;
    const provider = ProviderTypes.GoogleProvider;
    const payload = { uid, displayName, photoURL, provider };
    const action = { type: AuthTypes.logInWithGoogle, payload };

    localStorage.setItem('user', JSON.stringify(payload));
    dispatch(action);
    return true;
  };

  const LogInWithGitHub = async () => {
    const { ok, error, user } = await SingInWithGitHub();

    if (!ok) {
      dispatch({ type: AuthTypes.error, payload: error });
      return;
    }

    const userQueryResult = await GetUser(
      user.uid,
      ProviderTypes.GitHubProvider
    );

    if (!userQueryResult.ok) {
      dispatch({ type: AuthTypes.error, payload: userQueryResult.error });
      return;
    }

    const { uid, photoURL } = user;
    const screenName = user.reloadUserInfo.screenName;
    const provider = ProviderTypes.GitHubProvider;
    const payload = {
      uid,
      displayName: screenName,
      photoURL,
      provider,
      ...userQueryResult.user,
    };
    const action = { type: AuthTypes.logInWithGitHub, payload };

    localStorage.setItem('user', JSON.stringify(payload));
    dispatch(action);

    return true;
  };

  const updateCurrentUserInfo = (user) => {
    localStorage.removeItem('user');
    localStorage.setItem('user', user);
    dispatch({ type: AuthTypes.updateCurrentUserInfo, payload: user });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    singOutCurrent();
    dispatch({ type: AuthTypes.logOut });
  };

  return (
    <LogInContext.Provider
      value={{
        ...LogInState,
        LogInWithEmailAndPassWord,
        LogInWithGoogle,
        LogInWithGitHub,
        logOut,
      }}
    >
      {children}
    </LogInContext.Provider>
  );
};
