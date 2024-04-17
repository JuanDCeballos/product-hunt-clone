import { createContext } from 'react';

export const UserContext = createContext({
  User: { name: undefined, logged: false },
});
