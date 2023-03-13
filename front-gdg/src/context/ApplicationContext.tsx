import { createContext, useMemo, useReducer } from 'react';
import { INITIAL_STATE } from 'utils/constants';
import { ApplicationReducer } from './ApplicationReducer';

interface AppContextInterface {
  state: any;
}

type Props = {
  children: JSX.Element;
};
export const ApplicationContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);
function ApplicationContextWrapper({ children }: Props) {
  const [state, dispatch] = useReducer(ApplicationReducer, INITIAL_STATE);

  const authContext = useMemo(
    () => ({
      state,
    }),
    [state]
  );

  return (
    <ApplicationContext.Provider value={{ ...authContext }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export default ApplicationContextWrapper;
