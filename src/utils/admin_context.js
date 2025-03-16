import { createContext } from 'react';

export const AdminContext = createContext({
  admin: null,
  setAdmin: () => {},
});
