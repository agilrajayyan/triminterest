import { createContext } from 'react';

export const UserPreferenceContext = createContext({
  locale: 'en-US',
  currency: 'USD',
});
